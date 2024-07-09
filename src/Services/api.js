// api.js
import axios from 'axios';

const baseURL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

export const imagePath = "https://image.tmdb.org/t/p/w500/";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original/";

export const fetchTrending = async (timeWindow = 'day') => {
  const response = await axios.get(`${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`);
  return response.data.results;
};

export const fetchDetails = async (type, id) => {
  const response = await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`);
  return response.data;
};

export const fetchMovieCredits = async (type, id) => {
  const response = await axios.get(`${baseURL}/${type}/${id}/credits?api_key=${apiKey}`);
  return response.data;
};

export const fetchVideos = async (type, id) => {
  const response = await axios.get(`${baseURL}/${type}/${id}/videos?api_key=${apiKey}`);
  return response.data;
};

export const fetchMovies = async (page,sortBy) => {
  const response = await axios.get(`${baseURL}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
  return response.data;
};
export const fetchShows=async (page,sortBy)=>{
  const response = await axios.get(`${baseURL}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`);
  return response.data;
}
 export const searchData= async(query,page)=>{
  const response = await axios.get(`${baseURL}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`);
  return response.data;
 }