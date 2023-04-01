import axios from "@/api/axios";

const apiRegister = credentials => {
  return axios.post('/users', {user: credentials})
} 

const apiLogin = credentials => {
  return axios.post('/users/login', {user: credentials})
} 

export {
  apiRegister,
  apiLogin
}