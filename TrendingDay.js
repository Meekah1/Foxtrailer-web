import React from 'react';
import { useQuery } from 'react-query';
import { get_trendingDay } from '../../api/index';
import VerticalCard from '../VerticalCard';
import './TrendingDay.css';
import HorizontalLoader from '../HorizontalLoader';
import moment from 'moment';
import LazyLoading from './../LazyLoading/LazyLoading';

const TrendingDay = () => {
  const trendingDay = useQuery('trending/day', () => get_trendingDay());
  const { isLoading, isFetching, data } = trendingDay;
  // console.log('data', data);

  return (
    <>
      <div>{isLoading ? <HorizontalLoader /> : ''}</div>
      <div>
        {isFetching ? (
          <HorizontalLoader />
        ) : (
          <div className="flex-container">
            {data.data.results.map((movie) => {
              const {
                poster_path,
                id,
                original_name,
                original_title,
                first_air_date,
                release_date,
                vote_average,
              } = movie;
              return (
                <VerticalCard
                  percentage={vote_average * 10}
                  imageUrl={poster_path}
                  key={id}
                  title={original_name || original_title}
                  date={
                    moment(first_air_date).format('MMM Do YY') ||
                    moment(release_date).format('MMM Do YY')
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingDay;
