import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    // Vector numérico o cadenas para guardar los slugs o IDs de los hechizos
    preparedSpells: []
  }),
  actions: {
    togglePreparedSpell(spellId) {
      if (!spellId) return
      
      const index = this.preparedSpells.indexOf(spellId)
      if (index === -1) {
        // No está preparado: se graba su firma arcana en el grimorio
        this.preparedSpells.push(spellId)
      } else {
        // Estaba preparado: se desmaterializa del listado
        this.preparedSpells.splice(index, 1)
      }
    }
  },
  // Inyección del plugin persistente, salva la propiedad preparedSpells nativamente
  // en el LocalStorage de forma reactiva y automática bajo encripción base.
  persist: true
})
