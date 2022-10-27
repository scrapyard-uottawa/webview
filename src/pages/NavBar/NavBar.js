import './NavBar.css';

import { Link } from 'react-router-dom';

const NavBar = () => {
    return (  
        <div class="NavBar">
            <nav class="navbar navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="/">ScrapYard</a>
            
            <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
            </li>
            </nav>
        </div>
    );
}
 
export default NavBar;