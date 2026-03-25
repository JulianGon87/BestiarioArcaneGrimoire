<template>
  <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    <transition-group name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="bg-stone-800 text-stone-200 border border-secondary/50 px-6 py-4 rounded-lg shadow-xl font-body shadow-black/50 pointer-events-auto flex items-center gap-3 min-w-[300px]"
      >
        <i class="fas" :class="getIconClass(toast.type)"></i>
        <span>{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast.js'

const { toasts } = useToast()

const getIconClass = (type) => {
  if (type === 'success') return 'fa-check-circle text-green-500'
  if (type === 'error') return 'fa-exclamation-circle text-red-500'
  return 'fa-info-circle text-secondary'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}
</style>
