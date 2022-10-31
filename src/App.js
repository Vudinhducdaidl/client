import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import CrossRoad from './Router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <DataProvider>
      <Router>
        <CrossRoad />
      </Router>
      <ToastContainer />
    </DataProvider>

  );
}

export default App;
