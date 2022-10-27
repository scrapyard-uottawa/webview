import './NavBar.css';

import { Link } from 'react-router-dom';

const NavBar = () => {
    return (  
        <div class="NavBar">
            <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="/">ScrapYard</a>
            </nav>
        </div>
    );
}
 
export default NavBar;