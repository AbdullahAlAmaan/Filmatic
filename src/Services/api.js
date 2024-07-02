import React from 'react'
import axios from 'axios'

const baseURL="https://api.themoviedb.org/3"
const apiKey=import.meta.env.VITE_API_KEY;

export const fetchTrending=async (timeWindow='day')=>{
  const {data}=await axios.get(`${baseURL}/trending/all/${timeWindow}?api_Key=${apiKey}`);
  return data?.results;
}

export default api