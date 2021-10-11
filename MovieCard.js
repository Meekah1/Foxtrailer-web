import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';

function MovieCard({ imageUrl, percentage, title, date, overview }) {
  return (
    <div className="movieCard-container">
      <div className="movie-card">
        <Link to="/details">
          <img
            className="CardImg-size"
            src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
            alt="fox trailer"
          />
        </Link>
        <span className="progress-movie">
          <ProgressBar percentage={percentage} />
        </span>
        <div className="movieVert-container">
          <div className="title-date">
            <Link to="/details">
              <p className="movieVertical-title">{title}</p>
            </Link>
            <p className="movieVertical-date">{date}</p>
          </div>
          <p className="movie-overview">{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
