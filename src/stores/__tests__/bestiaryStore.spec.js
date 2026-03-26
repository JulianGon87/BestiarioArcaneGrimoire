import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('../../services/monsterService.js', () => ({
  getMonsters: vi.fn()
}))

import { useBestiaryStore } from '../bestiaryStore.js'
import { getMonsters } from '../../services/monsterService.js'

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
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('el estado inicial tiene monsters vacío y isFetched en false', () => {
    const store = useBestiaryStore()

    expect(store.monsters).toEqual([])
    expect(store.isFetched).toBe(false)
  })

  it('fetchMonsters() llama a getMonsters del servicio', async () => {
    getMonsters.mockResolvedValue(mockMonstersPayload)

    const store = useBestiaryStore()
    await store.fetchMonsters()

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
    getMonsters.mockRejectedValue(new Error('Network Error'))

    const store = useBestiaryStore()

    await expect(store.fetchMonsters()).rejects.toThrow('Network Error')
    expect(store.monsters).toEqual([])
    expect(store.isFetched).toBe(false)
  })
})
