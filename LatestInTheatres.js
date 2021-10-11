import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { get_video } from './../../api/index';
// import Radium, { StyleRoot } from 'radium';
import HorizontalCards from '../HorizontalCard/HorizontalCard';
import './LatestInTheatres.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles, Modal, Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 900,
    height: 530,
    backgroundColor: '#000',
  },
  '@media(max-width: 800px)': {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 400,
      height: 230,
    },
    paper: {
      position: 'absolute',
      width: 400,
      height: 230,
      backgroundColor: '#000',
    },
  },
}));

const LatestInTheatres = ({
  handleBackgroundImage,
  type,
  videoUrl,
  data,
  key,
}) => {
  const [url, setUrl] = useState();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const getVideo = (movie_id) => {
    get_video({ movie_id, type }).then((res) => {
      setUrl(res.data.results[0].key);
    });
  };
  const classes = useStyles();

  const handleOpen = (id) => {
    getVideo(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex-containers">
      {data
        .filter((res) => res.backdrop_path)
        .map((movie) => {
          const { backdrop_path, id, original_name, title } = movie;

          return (
            <div key={`${id}`} className="title-styile">
              <HorizontalCards
                onClick={() => handleOpen(id)}
                videoUrl={backdrop_path}
                title={original_name || title}
                handleBackgroundImage={handleBackgroundImage}
                id={id}
                type={type}
              />
              <PlayArrowIcon
                onClick={() => handleOpen(id)}
                style={{
                  borderRadius: '6rem',
                  fontSize: '5rem',
                  color: '#fff',
                  position: 'absolute',
                  top: '50px',
                  left: '120px',
                  cursor: 'pointer',
                }}
              />
              <Container maxWidth="lg">
                <Modal
                  style={{
                    opacity: 1,
                  }}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={open}>
                  <div style={modalStyle} className={classes.paper}>
                    <div className="closeIcon">
                      <CloseIcon
                        style={{
                          color: '#fff',
                          position: 'absolute',
                          left: '850px',
                          top: '10px',
                        }}
                        onClick={handleClose}
                      />
                    </div>
                    <h2 className="originalTitle-style"></h2>
                    <iframe
                      src={`https://www.youtube.com/embed/${url}`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen="yes"
                      alt=""
                    />
                  </div>
                </Modal>
              </Container>
            </div>
          );
        })}
    </div>
  );
};

export default LatestInTheatres;
