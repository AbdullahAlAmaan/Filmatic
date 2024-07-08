
// import axios from 'axios'

// export const imagePath = "https://image.tmdb.org/t/p/w500/";
// export const imagePathOriginal = "https://image.tmdb.org/t/p/original/"

// const baseURL = "https://api.themoviedb.org/3"
// const apiKey = import.meta.env.VITE_API_KEY;
// //TRENDING
// export const fetchTrending = async (timeWindow = 'day') => {
//   const { data } = await axios.get(`${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`);
//   return data?.results;
// }


// // DETAILS
// export const fetchDetails = async (type,id) => {
//   const res= await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`);
//   return res?.data;
// }
// //MOVIES-Credits
// export const fetchMovieCredits = async (type,id) => {
//   const res= await axios.get(`${baseURL}/${type}/${id}/credits?api_key=${apiKey}`);
//   return res?.data;
// }
// export const fetchVideos= async (type,id)=>{
//   const res= await axios.get(`${baseURL}/${type}/${id}/videos?api_key=${apiKey}`)
//   return res?.data;

// }
import axios from 'axios';

// Setup base URLs and image paths
export const imagePath = "https://image.tmdb.org/t/p/w500/";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original/";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;  // Make sure the environment variable is configured properly

// Fetch trending data
export const fetchTrending = async (timeWindow = 'day') => {
  try {
    console.log(`Fetching trending data for ${timeWindow}`);
    const response = await axios.get(`${baseURL}/trending/all/${timeWindow}?api_key=${apiKey}`);
    console.log('Trending data received:', response.data);
    return response.data?.results;
  } catch (error) {
    console.error('Error fetching trending data:', error);
    return null;  // Or handle differently
  }
}

// Fetch detailed information
export const fetchDetails = async (type, id) => {
  try {
    console.log(`Fetching details for ${type} with ID ${id}`);
    const response = await axios.get(`${baseURL}/${type}/${id}?api_key=${apiKey}`);
    console.log(`${type} details received:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${type} with ID ${id}:`, error);
    return null;  // Or handle differently
  }
}

// Fetch movie credits
export const fetchMovieCredits = async (type, id) => {
  try {
    console.log(`Fetching credits for ${type} with ID ${id}`);
    const response = await axios.get(`${baseURL}/${type}/${id}/credits?api_key=${apiKey}`);
    console.log(`${type} credits received:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching credits for ${type} with ID ${id}:`, error);
    return null;  // Or handle differently
  }
}

// Fetch videos related to a movie or TV show
export const fetchVideos = async (type, id) => {
  try {
    console.log(`Fetching videos for ${type} with ID ${id}`);
    const response = await axios.get(`${baseURL}/${type}/${id}/videos?api_key=${apiKey}`);
    console.log(`${type} videos received:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching videos for ${type} with ID ${id}:`, error);
    return null;  // Or handle differently
  }
}
