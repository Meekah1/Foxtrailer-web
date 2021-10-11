import update from 'immutability-helper';
import axios from 'axios';
import actionConstants from './actionConstants';
import { TMDB_URL, TMDB_API_KEY } from '../constants/config';
import Snackbar from 'react-native-snackbar';
// import { Platform } from 'react-native';

const { GET_TRENDING, GET_LISTING, GET_DETAILS, GET_ERROR } = actionConstants;

const search_movie = (search) =>
  axios.get(
    `${TMDB_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
  );
const search_tv = (search) =>
  axios.get(
    `${TMDB_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
  );

const get_trending = (media_type) =>
  axios.get(`${TMDB_URL}/trending/${media_type}/day?api_key=${TMDB_API_KEY}`);

const get_details = (media_type, movie_id) =>
  axios.get(
    `${TMDB_URL}/${media_type}/${movie_id}?api_key=${TMDB_API_KEY}&language=en-US`,
  );
const get_images = (media_type, movie_id) =>
  axios.get(
    `${TMDB_URL}/${media_type}/${movie_id}/images?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=images&include_image_language=en,null`,
  );

const get_videos = (media_type, movie_id) =>
  axios.get(
    `${TMDB_URL}/${media_type}/${movie_id}/videos?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

const get_similar = (media_type, movie_id) =>
  axios.get(
    `${TMDB_URL}/${media_type}/${movie_id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  );

export function fetch_trending(cb) {
  return async (dispatch) => {
    await axios
      .all([get_trending('movie'), get_trending('tv'), get_trending('person')])
      .then(
        axios.spread((movie, tv, person) => {
          // console.log('fetch_trending..', Platform.OS);
          cb &&
            cb({
              movie: movie.data.results,
              tv: tv.data.results,
              person: person.data.results,
            });
          dispatch({
            type: GET_TRENDING,
            payload: {
              movie: movie.data.results,
              tv: tv.data.results,
              person: person.data.results,
            },
          });
        }),
        (err) => {
          cb && cb('error');
          Snackbar.show({
            title: `${err.message}`,
            duration: Snackbar.LENGTH_LONG,
          });
          console.log('err', err);
        },
      );
  };
}
export function fetch_search(search, cb) {
  return async (dispatch) => {
    await axios.all([search_movie(search), search_tv(search)]).then(
      axios.spread((movie, tv) => {
        // console.log('fetch_trending..', Platform.OS);
        cb &&
          cb({
            movie: movie.data.results,
            tv: tv.data.results,
          });
      }),
      (err) => {
        cb && cb('error');
        Snackbar.show({
          title: `${err.message}`,
          duration: Snackbar.LENGTH_LONG,
        });
        console.log('err', err);
      },
    );
  };
}

export function fetch_details(param, handlePass, handleFail) {
  const { media_type, movie_id } = param;
  const get_all =
    media_type === 'person'
      ? [get_details(media_type, movie_id), get_images(media_type, movie_id)]
      : [
          get_details(media_type, movie_id),
          get_images(media_type, movie_id),
          get_videos(media_type, movie_id),
          get_similar(media_type, movie_id),
        ];

  return async (dispatch) => {
    await axios.all(get_all).then(
      axios.spread((details, images, videos, similar) => {
        const payload =
          media_type === 'person'
            ? { details: details.data, images: images.data }
            : {
                details: details.data,
                images: images.data,
                videos: videos.data.results,
                similar: similar.data.results,
              };
        dispatch({
          type: GET_DETAILS,
          payload,
        });
        handlePass(payload);
      }),
      (err) => {
        Snackbar.show({
          title:
            err.message === 'Network Error'
              ? 'Network Error'
              : 'Request failed. Bad Link',
          duration: Snackbar.LENGTH_LONG,
        });
        handleFail(err);
        console.log('err', err);
      },
    );
  };
}

export function fetch_Listing(param, cb) {
  const { media_type, query_type, page } = param;

  return async (dispatch) => {
    await axios
      .get(
        `${TMDB_URL}/${media_type}/${query_type}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      )
      .then(
        (res) => {
          // console.log(res.data);
          dispatch({
            type: GET_LISTING,
            payload: res.data,
          });
          cb && cb(res.data);
        },
        (err) => {
          Snackbar.show({
            title: `${err.message}`,
            duration: Snackbar.LENGTH_LONG,
          });
          console.log('err', err);
        },
      );
  };
}

function handleTrending(state, action) {
  return update(state, {
    trending: {
      $set: action.payload,
    },
  });
}

function handleListing(state, action) {
  return update(state, {
    listing: {
      $set: action.payload,
    },
  });
}

function handleDetails(state, action) {
  return update(state, {
    details: {
      $set: action.payload,
    },
  });
}

// function handleError(state, action) {
//   return update(state, {
//     error: {
//       $set: action.payload,
//     },
//   });
// }

const ACTION_HANDLERS = {
  GET_TRENDING: handleTrending,
  GET_LISTING: handleListing,
  GET_DETAILS: handleDetails,
  // GET_ERROR: handleError,
};

const initialState = {
  trending: [],
  listing: [],
  details: [],
  // error: '',
};

export default function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
