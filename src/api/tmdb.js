import axios from 'axios';
const apiKey = '271646b1495e3e27c91db4814e3a7193';
const baseUrl = 'https://api.themoviedb.org/3';
export const fetchNowPlaying = async (page = 1) => {
  const res = await axios.get(`${baseUrl}/movie/now_playing`, {
    params: { api_key: apiKey, page },
  });
  return res.data;
};

export const fetchMovieDetail = async (id) => {
  const res = await axios.get(`${baseUrl}/movie/${id}`, {
    params: { api_key: apiKey },
  });
  return res.data;
};

export const searchMovies = async (query, page = 1) => {
  const res = await axios.get(`${baseUrl}/search/movie`, {
    params: { api_key: apiKey, query, page },
  });
  return res.data;
};

export const fetchRecommendations = async (id) => {
  const res = await axios.get(`${baseUrl}/movie/${id}/recommendations`, {
    params: { api_key: apiKey },
  });
  return res.data;
};