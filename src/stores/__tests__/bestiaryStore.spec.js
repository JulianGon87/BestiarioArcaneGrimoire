import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// ─────────────────────────────────────────────────────────────
// INTERCEPTOR: vi.mock() reemplaza monsterService.js por un módulo
// virtual controlado. Cualquier archivo que importe monsterService
// recibirá esta versión falsa durante los tests.
// ─────────────────────────────────────────────────────────────
vi.mock('../../services/monsterService.js', () => ({
  getMonsters: vi.fn()
}))

// Importar el store DESPUÉS del vi.mock() para que tome el módulo falso
import { useBestiaryStore } from '../bestiaryStore.js'
import { getMonsters } from '../../services/monsterService.js'

// Colección falsa de monstruos para el mock
const mockMonstersPayload = {
  data: {
    results: [
      { id: 'goblin', name: 'Goblin', type: 'humanoid' },
      { id: 'troll', name: 'Troll', type: 'giant' },
      { id: 'lich', name: 'Lich', type: 'undead' }
    ]
  }
}

describe('bestiaryStore.js', () => {
  beforeEach(() => {
    // Activar una instancia limpia de Pinia antes de cada test
    setActivePinia(createPinia())
    // Resetear el mock entre tests para evitar contaminación
    vi.clearAllMocks()
  })

  it('el estado inicial tiene monsters vacío y isFetched en false', () => {
    const store = useBestiaryStore()

    expect(store.monsters).toEqual([])
    expect(store.isFetched).toBe(false)
  })

  it('fetchMonsters() llama a getMonsters del servicio', async () => {
    // Configurar el mock para que resuelva con el payload falso
    getMonsters.mockResolvedValue(mockMonstersPayload)

    const store = useBestiaryStore()
    await store.fetchMonsters()

    // Verificar que el servicio fue invocado
    expect(getMonsters).toHaveBeenCalledTimes(1)
  })

  it('fetchMonsters() popula el array monsters con los resultados de la API mockeada', async () => {
    getMonsters.mockResolvedValue(mockMonstersPayload)

    const store = useBestiaryStore()
    await store.fetchMonsters()

    expect(store.monsters).toHaveLength(3)
    expect(store.monsters[0].name).toBe('Goblin')
    expect(store.monsters[2].name).toBe('Lich')
  })

  it('fetchMonsters() establece isFetched en true tras una llamada exitosa', async () => {
    getMonsters.mockResolvedValue(mockMonstersPayload)

    const store = useBestiaryStore()
    expect(store.isFetched).toBe(false)

    await store.fetchMonsters()

    expect(store.isFetched).toBe(true)
  })

  it('fetchMonsters() lanza un error si el servicio falla', async () => {
    // Configurar el mock para que rechace la promesa
    getMonsters.mockRejectedValue(new Error('Network Error'))

    const store = useBestiaryStore()

    await expect(store.fetchMonsters()).rejects.toThrow('Network Error')
    // El estado no debe contaminar el store con datos parciales
    expect(store.monsters).toEqual([])
    expect(store.isFetched).toBe(false)
  })
})
