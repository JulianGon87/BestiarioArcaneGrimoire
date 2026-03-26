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
      return { data }
    } catch (error) {
      addToast(error.message || 'Error de conexión', 'error')
      throw error 
    }
  }
}

export default api
