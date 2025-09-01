import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Garage from './components/Garage/Garage';
import Winners from './components/Winners/Winners';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
