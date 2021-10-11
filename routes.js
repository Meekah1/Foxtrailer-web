import './App.css';
import ContainerLayout from './Layout/ContainerLayout';
import Trending from './screens/Trending';
import Details from './screens/Details/index';
import Search from './screens/Search/index';

const routes = [
  {
    path: '/',
    element: <ContainerLayout />,
    children: [
      { path: 'trending', element: <Trending /> },
      { path: 'details/:id', element: <Details /> },
      { path: 'movie', element: <Trending /> },
      { path: 'tv', element: <Trending /> },
      { path: '/', element: <Trending /> },
      { path: '*', element: <Trending /> },
      { path: 'search', element: <Search /> },
    ],
  },
];

export default routes;
