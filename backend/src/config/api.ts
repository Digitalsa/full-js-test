import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.novadax.com/v1/market/tickers'
})
