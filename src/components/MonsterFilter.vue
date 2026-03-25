<template>
  <div class="relative w-full sm:w-64 z-10">
    <select 
      v-model="model" 
      class="w-full appearance-none bg-stone-900/80 border border-secondary text-primary px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer shadow-black/40 shadow-lg pr-10"
    >
      <option value="">Todos los tipos</option>
      <option value="Aberration">Aberración</option>
      <option value="Beast">Bestia</option>
      <option value="Celestial">Celestial</option>
      <option value="Construct">Constructo</option>
      <option value="Dragon">Dragón</option>
      <option value="Elemental">Elemental</option>
      <option value="Fey">Feérico</option>
      <option value="Fiend">Infernal</option>
      <option value="Giant">Gigante</option>
      <option value="Humanoid">Humanoide</option>
      <option value="Monstrosity">Monstruosidad</option>
      <option value="Ooze">Cieno</option>
      <option value="Plant">Planta</option>
      <option value="Undead">No-muerto</option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-secondary">
      <i class="fas fa-chevron-down"></i>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ type: String, default: '' })
</script>
