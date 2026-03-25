import { defineStore } from 'pinia'
import api from '../services/api.js'

export const useSpellStore = defineStore('spell', {
  state: () => ({
    spells: [],
    isFetched: false
  }),
  getters: {
    highLevelSpellsCount: (state) => {
      // Retorna la cantidad de hechizos que sean Nivel 5 o superior.
      // Basado en el campo 'level_int' numérico nativo de open5e.
      return state.spells.filter(spell => {
        if (typeof spell.level_int !== 'undefined') {
          return spell.level_int >= 5
        }
        // Expresión regular como mecanismo de escape (fallback) si viene como "5th-level"
        const match = String(spell.level || '').match(/\d+/)
        return match ? parseInt(match[0]) >= 5 : false
      }).length
    }
  },
  actions: {
    async fetchSpells() {
      try {
        // Apuntando directo al endpoint global (trae 50 por defecto en open5e)
        // Podríamos pasar params de limit si se deseara todo el grimorio
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
