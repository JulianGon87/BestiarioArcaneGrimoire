import { useToast } from '../composables/useToast.js'

export const api = {
  async get(endpoint) {
    const { addToast } = useToast()

    try {
      const url = `${import.meta.env.VITE_DND_API_URL}${endpoint}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Ha fallado la petición`)
      }

      const data = await response.json()
      // Simulamos la estructura de Axios devoviendo la respuesta dentro de un obj "data"
      return { data }
    } catch (error) {
      addToast(error.message || 'Error de conexión', 'error')
      throw error // Re-lanzamos para que la vista lo maneje
    }
  }
}

export default api
