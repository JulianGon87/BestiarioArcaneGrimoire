import api from './api.js'

export const getMonsters = async ({ limit = 50, page = 1, search = '' } = {}) => {
  let endpoint = `/monsters/?limit=${limit}&page=${page}`
  if (search) {
    endpoint += `&search=${encodeURIComponent(search)}`
  }
  return await api.get(endpoint)
}

export const getSpells = async (limit = 10) => {
  return await api.get(`/spells/?limit=${limit}`)
}
