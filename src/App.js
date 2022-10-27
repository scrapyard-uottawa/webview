import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import pages
import ListMachines from "./pages/ListMachines/ListMachines";
import Machine from "./pages/Machine/Machine";

import './App.css';
import Navbar from "./pages/NavBar/NavBar";


const firebaseConfig = {
  apiKey: "AIzaSyBhFXznlWBWdgGhGOhvwusRf5RAYwCJ3bc",
  authDomain: "scrapyard-7fbdb.firebaseapp.com",
  databaseURL: "https://scrapyard-7fbdb-default-rtdb.firebaseio.com",
  projectId: "scrapyard-7fbdb",
  storageBucket: "scrapyard-7fbdb.appspot.com",
  messagingSenderId: "410281909392",
  appId: "1:410281909392:web:e4ead07b4f723ea79f4c15",
  measurementId: "G-T819PNM3JT"
};



function App() {
  return (

    <Router>    
      <Navbar/>
      <div className="App">
      </div>
      <Routes>
        <Route path="/" element={<ListMachines />} />
      </Routes>
      <Routes>
        <Route path="/machine-info/:machineID" element={<Machine />} />
      </Routes>
    </Router>
  );
}


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const machinesRef = collection(db, "machines");



export default App;
