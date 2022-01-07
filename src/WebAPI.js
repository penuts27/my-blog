import { getAuthToken } from './utils'
const BASE_API = 'https://student-json-api.lidemy.me'

export const getPost = () => {
    return fetch(`${BASE_API}/posts?_sort=createdAt&_order=desc`)
    .then(res => res.json())
}
export const postApi = (title,content) => {
  const token = getAuthToken()
  return fetch(`${BASE_API}/posts`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title,
    username: 'hongshengWang',
    body: content,
  })
})
.then(res => res.json())
}

export const login = (username,password) => {
    return fetch(`${BASE_API}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(res => res.json())
}
export const getMe = () => {
    const token = getAuthToken()
    return fetch(`${BASE_API}/me`, {
    headers: {
        'authorization': `Bearer ${token}`
    }
})
.then(res => res.json())
}