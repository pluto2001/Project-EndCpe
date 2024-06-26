import React from 'react';
import {useRoutes} from 'react-router-dom';
import Welcome from './Welcome';
import Register from './Register'
import Home from './Home';
import Homeadmin from './Homeadmin';

export default function App() {
  let element = useRoutes([
    {path: '/', element: <Welcome />},
    {path: '/register', element: <Register />},
    {path: '/home', element: <Home />},
    {path: '/homeadmin', element: <Homeadmin />},
  ]);

  return element;
}
