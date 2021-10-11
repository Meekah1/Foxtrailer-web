import React from 'react';
import { useQuery } from 'react-query';
import { get_tvPopular, get_video } from './../../api/index';
import HorizontalCards from '../HorizontalCard/HorizontalCard';
import './LatestOnTv.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HorizontalLoader from './../HorizontalLoader/index';

const LatestOnTv = ({ handleBackgroundImage }) => {
  const tvPopular = useQuery('popular/tv', () => get_tvPopular(), {});
  const { isLoading, isFetching, data } = tvPopular;

  return (
    <>
      <div>{isLoading ? <HorizontalLoader /> : ''}</div>
      <div>
        {isFetching ? (
          <HorizontalLoader />
        ) : (
          <div className="flex-containers">
            {data.data.results.map((movie) => {
              const { backdrop_path, id, original_name, name } = movie;
              return (
                <div key={`${id}`}>
                  <div className="title-style">
                    <HorizontalCards
                      videoUrl={backdrop_path}
                      title={name}
                      handleBackgroundImage={handleBackgroundImage}
                      id={id}
                    />
                    <PlayArrowIcon
                      style={{
                        borderRadius: '6rem',
                        fontSize: '5rem',
                        color: '#fff',
                        position: 'absolute',
                        top: '50px',
                        left: '120px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default LatestOnTv;
