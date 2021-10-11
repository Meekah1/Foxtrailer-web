import React from 'react';
import { useQuery } from 'react-query';
import { get_tvPopular } from './../../api/index';

import VerticalCards from '../VerticalCards/Verticalcard';
import './PopularOnTv.css';
import Fetching from '../Fetching/Fetching';
import moment from 'moment';
import LazyLoading from './../LazyLoading/LazyLoading';

const PopularOnTv = () => {
  const tvPopular = useQuery('popular/tv', () => get_tvPopular());
  const { isLoading, isFetching, data } = tvPopular;
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
                original_name,
                first_air_date,
                vote_average,
              } = movie;
              return (
                <VerticalCard
                  percentage={vote_average * 10}
                  imageUrl={poster_path}
                  key={id}
                  title={original_name}
                  date={moment(first_air_date).format('MMM Do YY')}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PopularOnTv;
