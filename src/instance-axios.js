import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://sandbox.asaas.com/api/v3',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', access_token: process.env.ACCESS_TOKEN  },
})

