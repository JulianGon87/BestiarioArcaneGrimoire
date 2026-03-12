<template>
  <span 
    class="px-2 py-1 rounded text-xs font-bold border shadow-sm uppercase tracking-wider"
    :class="badgeClasses"
  >
    {{ type }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const badgeClasses = computed(() => {
  switch (props.type.toLowerCase()) {
    case 'bestia':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'no-muerto':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'dragón':
    case 'dragon':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'aberración':
    case 'aberracion':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    case 'constructo':
      return 'bg-stone-200 text-stone-800 border-stone-300'
    default:
      return 'bg-stone-100 text-stone-600 border-stone-200'
  }
})
</script>
