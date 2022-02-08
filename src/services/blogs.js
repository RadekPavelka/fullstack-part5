import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create =  newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('new object ', newObject)
  console.log('config ', config)
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }