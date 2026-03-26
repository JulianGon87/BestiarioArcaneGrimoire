import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    preparedSpells: []
  }),
  actions: {
    togglePreparedSpell(spellId) {
      if (!spellId) return
      
      const index = this.preparedSpells.indexOf(spellId)
      if (index === -1) {
        this.preparedSpells.push(spellId)
      } else {
        this.preparedSpells.splice(index, 1)
      }
    }
  },
  persist: true
})
