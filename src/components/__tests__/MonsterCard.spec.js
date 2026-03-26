import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonsterCard from '../MonsterCard.vue'

const vGlowStub = { mounted() {}, updated() {}, unmounted() {} }

const globalOptions = {
  stubs: {
    FontAwesomeIcon: true,
    RouterLink: { template: '<a><slot /></a>' },
    TypeBadge: true
  },
  directives: {
    glow: vGlowStub
  }
}

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

    const bookButton = wrapper.find('button')
    expect(bookButton.exists()).toBe(true)

    await bookButton.trigger('click')

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
