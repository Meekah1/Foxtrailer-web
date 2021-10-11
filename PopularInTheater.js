import React from 'react';
import { useQuery } from 'react-query';
import { get_moviePopular } from './../../api/index';
import VerticalCards from '../VerticalCards/VerticalCard';
import './PopularInTheater.css';
import Fetching from '../Fetching/Fetching';
import moment from 'moment';
import LazyLoading from './../LazyLoading/LazyLoading';

const PopularInTheater = () => {
  const moviePopular = useQuery('popular/movie', () => get_moviePopular());
  const { isLoading, isFetching, data } = moviePopular;
  // console.log('data', data);

  return (
    <>
      <div>
        {isLoading ? (
          <div>
            <span className="fetchStyle">
              <Fetching />
            </span>
            <LazyLoading />
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        {isFetching ? (
          <LazyLoading />
        ) : (
          <div className="flex-container">
            {data.data.results.map((movie) => {
              const {
                poster_path,
                id,
                original_title,
                release_date,
                vote_average,
              } = movie;
              return (
                <VerticalCards
                  percentage={vote_average * 10}
                  imageUrl={poster_path}
                  key={id}
                  title={original_title}
                  date={moment(release_date).format('MMM Do YY')}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PopularInTheater;
