import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatBadge from '../StatBadge.vue'

describe('StatBadge.vue', () => {
  it('renderiza el valor numérico recibido por prop', () => {
    const wrapper = mount(StatBadge, {
      props: {
        value: 18,
        label: 'Fuerza'
      }
    })

    // El texto "18" debe aparecer en el DOM del componente
    expect(wrapper.text()).toContain('18')
  })

  it('renderiza correctamente la etiqueta label', () => {
    const wrapper = mount(StatBadge, {
      props: {
        value: 14,
        label: 'Destreza'
      }
    })

    expect(wrapper.text()).toContain('Destreza')
  })

  it('renderiza un valor string correctamente', () => {
    const wrapper = mount(StatBadge, {
      props: {
        value: '18'
      }
    })

    expect(wrapper.find('.stat-value').text()).toBe('18')
  })
})
