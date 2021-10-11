import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, makeStyles } from '@material-ui/core';
import Header from '../components/Header';
import Footer from '../components/Footer';

const useStyles = makeStyles(() => ({
  container: {
    padding: '0',
    // position: 'relative',
    // top: '8vh',
  },
  containerHeader: {
    // padding: '0',
  },
}));

const ContainerLayout = () => {
  const { container, containerHeader } = useStyles();

  return (
    <Box>
      <Header />
      <Container disableGutters maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default ContainerLayout;
