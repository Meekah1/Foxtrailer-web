import React from 'react';
import './VerticalCard.css';

import Progressbar from '../ProgressBar/Progressbar';

function Card({ imageUrl, title, date, percentage }) {
  return (
    <div>
      <div className="image-containers">
        <img
          className="img-size"
          src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
          alt="fox trailer"
        />
        <Progressbar percentage={percentage} />
        <div className="vert-container">
          <p className="vertical-title">{title}</p>
          <p className="vertical-date">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
