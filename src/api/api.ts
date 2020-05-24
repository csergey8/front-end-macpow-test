import axios from 'axios'

const chuckNorrisInstance = axios.create({
  baseURL: 'https://api.chucknorris.io/jokes'
})

const chuckNorrisApi = {
  getCategories: async () => await chuckNorrisInstance.get('/categories'),
  getRandomJoke: async () => await chuckNorrisInstance.get('/random'),
  getJokeBySearchText: async (text: string) => await chuckNorrisInstance.get('/search', { params: { query: text } }),
  getJokeByCategory: async (category: string) => await chuckNorrisInstance.get('/random', { params: { category } })
}

export { chuckNorrisApi }