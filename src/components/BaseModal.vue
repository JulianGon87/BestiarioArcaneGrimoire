<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" @click="close">
        <div class="bg-primary border-2 border-secondary/50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative overflow-hidden" @click.stop>
          
          <header class="p-6 border-b-2 border-secondary/30 bg-secondary/10 relative text-center">
            <slot name="header">
              <h2 class="text-3xl font-display text-secondary">Modal Title</h2>
            </slot>
            <button @click="close" class="absolute top-4 right-4 text-secondary/60 hover:text-red-800 transition-colors w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary/10">
              <font-awesome-icon :icon="['fas', 'times']" class="text-xl" />
            </button>
          </header>
          
          <main class="p-6 overflow-y-auto custom-scrollbar flex-1 bg-primary">
            <slot name="body">
              <p>Modal content goes here.</p>
            </slot>
          </main>
          
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:isOpen', 'close'])

const close = () => {
  emit('update:isOpen', false)
  emit('close')
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 4px 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.5); 
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: padding-box;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.9);
  border: 2px solid transparent;
  background-clip: padding-box;
}
</style>
