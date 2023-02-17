import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import DataUpload from './components/DataUpload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';

class App extends Component {
    render() {
      return (
        <div className="App">
          <Navbar />
          <Router>
            <Routes>
              <Route path="/" element={<DataUpload  />} />
            </Routes>
          </Router>
        </div>
      );
    }
  }

export default App;
