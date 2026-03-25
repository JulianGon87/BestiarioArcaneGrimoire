import { defineStore } from 'pinia'
import { getMonsters } from '../services/monsterService.js'

export const useBestiaryStore = defineStore('bestiary', {
  state: () => ({
    monsters: [],
    isFetched: false
  }),
  actions: {
    async fetchMonsters(page = 1, search = '') {
      try {
        const response = await getMonsters({ page, search, limit: 50 })
        // Suponiendo que la API provee results dentro de un array paginado según modificaciones previas (Fase 9),
        // guardaremos la colección completa para ser medida (lenght) por otros componentes.
        this.monsters = response.data.results || response.data
        this.isFetched = true
        return response.data
      } catch (error) {
        console.error('Bestiary Store - Error recabando monstruos:', error)
        throw error
      }
    }
  }
})
