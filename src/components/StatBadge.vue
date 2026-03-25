<template>
  <div class="stat-badge bg-stone-800/10 p-2 rounded border border-stone-800/5 shadow-sm text-center">
    <div class="text-xs font-bold text-stone-500 mb-1">{{ label }}</div>
    <div class="text-lg font-display text-stone-900 stat-value">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: [Number, String],
    required: true
  }
})
</script>
