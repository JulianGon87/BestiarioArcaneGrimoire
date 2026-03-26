<template>
  <div class="bg-[#f4ebd8] p-6 rounded-md shadow-inner border border-[#d2b48c] font-body relative overflow-hidden mt-2">
    <div class="absolute top-2 left-2 text-[#b08d55] opacity-50"><i class="fas fa-scroll text-2xl"></i></div>
    
    <h3 class="font-display text-2xl text-secondary mb-4 text-center border-b border-[#d2b48c] pb-2">Crónicas y Leyendas</h3>
    
    <p class="text-stone-800 leading-relaxed indent-8 first-letter:text-5xl first-letter:font-display first-letter:text-stone-900 first-letter:float-left first-letter:mr-2">
      {{ monster.description }}
    </p>

    <div class="mt-6 pt-4 border-t border-[#d2b48c]/50 text-stone-600 text-sm italic text-center">
      Extraído del tomo de las maravillas arcanas. Nivel de amenaza clasificado como {{ monster.difficulty }}.
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
