<template>
  <div class="bg-stone-800/5 text-stone-800 p-4 rounded-lg border border-stone-800/10 font-serif">
     <h3 class="font-display text-xl mb-3 text-secondary border-b border-stone-800/10 pb-2">Atributos Base</h3>
     
     <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
         <div class="bg-stone-800/10 p-2 rounded border border-stone-800/5 shadow-sm">
            <div class="text-xs font-bold text-stone-500 mb-1">Fuerza</div>
            <div class="text-lg font-display text-stone-900">18 (+4)</div>
         </div>
         <div class="bg-stone-800/10 p-2 rounded border border-stone-800/5 shadow-sm">
            <div class="text-xs font-bold text-stone-500 mb-1">Destreza</div>
            <div class="text-lg font-display text-stone-900">14 (+2)</div>
         </div>
         <div class="bg-stone-800/10 p-2 rounded border border-stone-800/5 shadow-sm">
            <div class="text-xs font-bold text-stone-500 mb-1">Constitución</div>
            <div class="text-lg font-display text-stone-900">16 (+3)</div>
         </div>
         <div class="bg-stone-800/10 p-2 rounded border border-stone-800/5 shadow-sm">
            <div class="text-xs font-bold text-stone-500 mb-1">Inteligencia</div>
            <div class="text-lg font-display text-stone-900">10 (+0)</div>
         </div>
     </div>
  </div>
</template>

<script setup>
defineProps({
  monster: {
    type: Object,
    required: true
  }
})
</script>
