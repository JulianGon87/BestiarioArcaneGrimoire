import { defineStore } from 'pinia'
import api from '../services/api.js'

export const useSpellStore = defineStore('spell', {
  state: () => ({
    spells: [],
    isFetched: false
  }),
  getters: {
    highLevelSpellsCount: (state) => {
      return state.spells.filter(spell => {
        if (typeof spell.level_int !== 'undefined') {
          return spell.level_int >= 5
        }
        const match = String(spell.level || '').match(/\d+/)
        return match ? parseInt(match[0]) >= 5 : false
      }).length
    }
  },
  actions: {
    async fetchSpells() {
      try {
        const response = await api.get('/spells/?limit=100')
        this.spells = response.data.results || response.data
        this.isFetched = true
      } catch (error) {
        console.error('Error cargando la alta red de hechizos:', error)
        throw error
      }
    }
  }
})
