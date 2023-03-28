import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import DataUpload from './components/DataUpload/DataUpload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import SignIn from './components/SignIn/SignIn';
import DetectionsList from './components/Admin/DetectionsList';
import MachineList from './components/Admin/MachineList';
import MachineList2 from './components/Admin/MachineListDev';
import MachineList3 from './components/Admin/MachineListUser';
import HomePage from './components/HomePage/HomePage';
import DetectionPage from './components/Admin/DetectionPage';
import MachineUsersAssigned from './components/Admin/MachineUsersAssigned';
import TrashForm from './components/DataUpload/TrashForm';
import AssignUsers from './components/Admin/AssignUsers';

class App extends Component {
    render() {
      return (
        <div className="App">
          <Router>
          {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/:id" element={<MachineList />} />
              <Route path="/admin2" element={<MachineList2 />} />
              <Route path="/admin3" element={<MachineList3 />} />
              <Route path="/detections/:id" element={<DetectionsList />} />
              <Route path="/dev/:id" element={<DataUpload  />} />
              <Route path="/dev2/:id" element={<TrashForm  />} />
              <Route path="/signin" default element={<SignIn  />} />
              <Route path='/individualDetection/:mid/:tid/:id' element={<DetectionPage />} />
              <Route path='/usersAssigned/:id' element={<MachineUsersAssigned />} />
              <Route path='/addUsers/:id/:id' element={<AssignUsers />} />
            </Routes>
          </Router>
        </div>
      );
    }
  }

export default App;
