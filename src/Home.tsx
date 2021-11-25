import './Home.css';
import { Link } from "react-router-dom";

/** Renders Home page
 * 
 * Props: none
 * State: none
 * 
 * Routes -> Home
 * 
 * Location: /
 */
function Home() {
    return (
        <div className="home">
            <h1>
                <img className="home-img" src="/pixly_logo_full.png" alt="logo"></img>
            </h1>
            <Link to="/upload">
                <button className="btn btn-primary">
                    Upload and Edit an Image
                </button>
            </Link>
            <Link to="/all">
                <button className="btn btn-secondary">
                    View All Images
                </button>
            </Link>
        </div>
    )
}

export default Home;