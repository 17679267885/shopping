//对外暴露一个函数
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}
export const remToken = () => {
  return localStorage.removeItem('token')
}