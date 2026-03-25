import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonsterCard from '../MonsterCard.vue'

// Stub vacío para la directiva personalizada v-glow (no disponible fuera de main.js)
const vGlowStub = { mounted() {}, updated() {}, unmounted() {} }

// Opciones globales reutilizables para todos los montajes del test
const globalOptions = {
  stubs: {
    FontAwesomeIcon: true,
    // RouterLink stub que renderiza sus hijos (slot) para que el texto sea accesible
    RouterLink: { template: '<a><slot /></a>' },
    TypeBadge: true
  },
  directives: {
    glow: vGlowStub
  }
}

// Objeto monstruo simulado (mock) mínimo para el test
const mockMonster = {
  id: 'ancient-red-dragon',
  name: 'Ancient Red Dragon',
  type: 'dragon',
  description: 'Un terrorífico dragón de fuego ancestral.',
  hp: 546,
  ac: 22,
  cr: 24,
  image: 'https://example.com/dragon.png'
}

describe('MonsterCard.vue', () => {
  it('emite el evento "open-grimoire" con el monstruo al hacer clic en el botón del libro', async () => {
    const wrapper = mount(MonsterCard, {
      props: { monster: mockMonster },
      global: globalOptions
    })

    // Buscar el botón que emite el evento de apertura del grimorio
    const bookButton = wrapper.find('button')
    expect(bookButton.exists()).toBe(true)

    // Disparar el clic sobre el botón
    await bookButton.trigger('click')

    // Verificar que el evento fue emitido con el objeto del monstruo
    const emitted = wrapper.emitted('open-grimoire')
    expect(emitted).toBeTruthy()
    expect(emitted).toHaveLength(1)
    expect(emitted[0][0]).toEqual(mockMonster)
  })

  it('renderiza el nombre del monstruo en el HTML', () => {
    const wrapper = mount(MonsterCard, {
      props: { monster: mockMonster },
      global: globalOptions
    })

    // El nombre se encuentra dentro de un <router-link> stubado.
    // Usamos html() que incluye el contenido de los slots de los stubs.
    expect(wrapper.html()).toContain('Ancient Red Dragon')
  })

  it('muestra los puntos de golpe del monstruo', () => {
    const wrapper = mount(MonsterCard, {
      props: { monster: mockMonster },
      global: globalOptions
    })

    expect(wrapper.text()).toContain('546 HP')
  })
})
