import React, { useState } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './Filter.css';
// import HelpIcon from '@material-ui/icons/Help';

const Filter = ({ onItemSelect }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  return (
    <div className="filter-dropdown">
      <div className="filter-dropdown-header" onClick={toggleDropdown}>
        <h2>Filter</h2>
        <span className={`filter-iconClosed ${isOpen && 'filter-iconArrow'}`}>
          <ChevronRightIcon />
        </span>
      </div>
      <div className={`filter-dropdown-body ${isOpen && 'filter-open'}`}>
        <h4>Genres</h4>
        <ul className="genre">
          <li className="genre-list" onClick={onItemSelect}>
            Action
          </li>
          <li className="genre-list">Adventure</li>
          <li className="genre-list">Animation</li>
          <li className="genre-list">Comedy</li>
          <li className="genre-list">Crime</li>
          <li className="genre-list">Documentary</li>
          <li className="genre-list">Drama</li>
          <li className="genre-list">Family</li>
          <li className="genre-list">Fantasy</li>
          <li className="genre-list">History</li>
          <li className="genre-list">Horror</li>
          <li className="genre-list">Music</li>
          <li className="genre-list">Mystery</li>
          <li className="genre-list">Romance</li>
          <li className="genre-list">Science Fiction</li>
          <li className="genre-list">Tv Movie</li>
          <li className="genre-list">Thriller</li>
          <li className="genre-list">War</li>
          <li className="genre-list">Western</li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
