import React from 'react';
import './ToggleLatest.css';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function ToggleLatest({ toggled, onClick, name, subName }) {
  return (
    <div
      onClick={onClick}
      className={`toggle-style${toggled ? ' switch-style' : ''}`}>
      <div className={`togle-flex${toggled ? ' tog' : ''}`}>
        <h2 className="togle-onTv">{name}</h2>
        <h2 className="togle-onTheatre">{subName}</h2>
      </div>
      <div className="notch-style" />
    </div>
  );
}

export default ToggleLatest;
