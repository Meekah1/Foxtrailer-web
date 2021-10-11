import React, { useState, useEffect } from 'react';
import { get_video } from '../../api';
import './HorizontalCard.css';

const SubTitle = ({ id, type }) => {
  const [newTitle, setNewTitle] = useState([]);

  useEffect(() => {
    getNewName(id);
  }, []);

  const getNewName = (movie_id) => {
    get_video({ movie_id, type }).then((res) => {
      setNewTitle(res.data.results[0]?.name);
    });
  };

  return <p className="horizon-name">{`${newTitle ? newTitle : ''}`}</p>;
};

const HorizontalCard = ({
  videoUrl,
  title,
  date,
  subTitle,
  handleBackgroundImage,
  id,
  type,
}) => {
  return (
    <div
      className="image-container"
      onMouseEnter={() => handleBackgroundImage(videoUrl)}>
      <div className="hover-effect">
        <img
          className="img-sizes"
          src={`https://image.tmdb.org/t/p/w500/${videoUrl}`}
          alt="fox trailer"
        />
      </div>
      <div className="horizon-container">
        <p className="horizon-title">{title}</p>
        <SubTitle
          id={id}
          type={type}
          style={{
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            fontFamily: `'Source Sans Pro', Arial, sans-serif`,
            marginTop: '-100px',
          }}
        />
      </div>
    </div>
  );
};

export default HorizontalCard;
