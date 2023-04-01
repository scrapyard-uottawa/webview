import './App.css';
import React from 'react';
import DataUpload from './components/DataUpload/DataUpload';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './components/NavBar/NavBar';
import SignIn from './components/SignIn/SignIn';
import DetectionsList from './components/Admin/DetectionsList';
import MachineList from './components/Admin/MachineList';
import HomePage from './components/HomePage/HomePage';
import DetectionPage from './components/Admin/DetectionPage';
import MachineUsersAssigned from './components/Admin/MachineUsersAssigned';
import TrashForm from './components/DataUpload/TrashForm';
import AssignUsers from './components/Admin/AssignUsers';

function withAuthDev(Component) {
  const role = Cookies.get('role');

  return function AuthenticatedComponent(props) {
    if (role === 'Dev') {
      return <Component {...props} />;
    } else {
      return <Navigate to="/signin" />;
    }
  };
}

function withAuthAdmin(Component) {
  const role = Cookies.get('role');
  return function AuthenticatedComponent(props) {
    if (role === 'Dev' || role === 'Admin') {
      return <Component {...props} />;
    } else {
      return <Navigate to="/signin" />;
    }
  };
}

const AssignUsersWithAuth = withAuthAdmin(AssignUsers);

const DataUploadWithAuth = withAuthDev(DataUpload);
const TrashFormWithAuth = withAuthDev(TrashForm);

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<MachineList />} />
          <Route path="/detections/:id" element={<DetectionsList />} />
          <Route path="/dev" element={<DataUploadWithAuth />} />
          <Route path="/dev2" element={<TrashFormWithAuth />} />
          <Route path="/signin" default element={<SignIn />} />
          <Route path='/individualDetection/:mid/:tid' element={<DetectionPage />} />
          <Route path='/usersAssigned' element={<MachineUsersAssigned />} />
          <Route path='/addUsers/:id' element={<AssignUsersWithAuth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
