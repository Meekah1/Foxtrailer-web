import React, { useState } from 'react';
import './Index.css';
import ToggleSwitch from '../ToggleSwitch';
import TrendingWeek from './../TrendingWeek/TrendingWeek';
import TrendingDay from './../TrendingDay/TrendingDay';

function Index({ name }) {
  const [toggled, setToggled] = useState(false);
  const handleClick = () => {
    setToggled((s) => !s);
  };

  return (
    <div className="cardvv-container">
      <div className="card-switch">
        <h2 className="card-text">{name}</h2>
        <ToggleSwitch
          name="Today"
          subName="This Week"
          toggled={toggled}
          onClick={handleClick}
        />
      </div>
      {toggled ? (
        <div>
          <TrendingWeek />
        </div>
      ) : (
        <div>
          <TrendingDay />
        </div>
      )}
    </div>
  );
}

export default Index;
