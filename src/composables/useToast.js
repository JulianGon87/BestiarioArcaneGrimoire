import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
  const addToast = (message, type = 'success') => {
    const id = nextId++
    toasts.value.push({ id, message, type })
    
    // Auto-eliminar después de 3.5 segundos
    setTimeout(() => {
      removeToast(id)
    }, 3500)
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}
