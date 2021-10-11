import axios from 'axios';
import { TMDB_URL, TMDB_API_KEY } from '../constants/config';
import { YOUTUBE_URL, YOUTUBE_API_KEY } from '../constants/config';

export const get_video = ({ type, movie_id }) =>
  axios.get(`${TMDB_URL}/${type}/${movie_id}/videos?api_key=${TMDB_API_KEY}`);

export const search_video = ({ search, page = 1 }) =>
  axios.get(
    `${YOUTUBE_URL}/search/movie?api_key=${YOUTUBE_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false&page=${page}`,
  );

export const search_movie = ({ search, page = 1 }) =>
  axios.get(
    `${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false&page=${page}`,
  );

export const search_tv = (search) =>
  axios.get(
    `${TMDB_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
  );

export const get_trendingDay = (media_type) =>
  axios.get(`${TMDB_URL}/trending/${media_type}/day?api_key=${TMDB_API_KEY}`);

export const get_trendingWeek = (media_type) =>
  axios.get(`${TMDB_URL}/trending/${media_type}/week?api_key=${TMDB_API_KEY}`);

export const get_tvPopular = (media_type) =>
  axios.get(`${TMDB_URL}/tv/popular?api_key=${TMDB_API_KEY}`);

export const get_tvLatest = () =>
  axios.get(`${TMDB_URL}/tv/latest?api_key=${TMDB_API_KEY}`);

export const get_moviePopular = (media_type) =>
  axios.get(
    `${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

export const get_movieLatest = (media_type) =>
  axios.get(
    `${TMDB_URL}/movie/latest?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

export const get_details = (movie_id) =>
  axios.get(
    `${TMDB_URL}/movie/${movie_id}?api_key=${TMDB_API_KEY}&language=en-US`,
  );

export const get_images = (media_type, movie_id) =>
  axios.get(
    `${TMDB_URL}/${media_type}/${movie_id}/images?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=images&include_image_language=en,null`,
  );

export const get_videos = (media_type, movie_id) =>
  axios.get(
    `${TMDB_URL}/${media_type}/${movie_id}/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

export const get_similar = (movie_id) =>
  axios.get(
    `${TMDB_URL}/movie/${movie_id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );
export const fetch_latest = () =>
  Promise.all([get_tvPopular(), get_moviePopular()]);

export const fetch_allInitial = () =>
  Promise.all([
    get_tvPopular(),
    get_moviePopular(),
    get_trendingDay(),
    get_trendingWeek(),
  ]);
