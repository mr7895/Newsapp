import React, { useState } from 'react'
import { Link} from "react-router-dom";

const NavBar = ({ onSearch, isDarkMode, toggleTheme, onCategoryChange, searchQuery }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleCategoryClick = () => {
        setSearchTerm(""); // Clear search input
        onCategoryChange(); // Clear search query in parent
    };

    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={handleCategoryClick}>
                        <span className="brand-text">📰 NewsHub</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/" onClick={handleCategoryClick}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle btn btn-link"
                                    id="navbarDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Categories
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/business" onClick={handleCategoryClick}>Business</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment" onClick={handleCategoryClick}>Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/health" onClick={handleCategoryClick}>Health</Link></li>
                                    <li><Link className="dropdown-item" to="/science" onClick={handleCategoryClick}>Science</Link></li>
                                    <li><Link className="dropdown-item" to="/sports" onClick={handleCategoryClick}>Sports</Link></li>
                                    <li><Link className="dropdown-item" to="/technology" onClick={handleCategoryClick}>Technology</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex search-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input 
                                    className="form-control search-input"
                                    type="search"
                                    placeholder="Search news..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    🔍
                                </button>
                            </div>
                        </form>
                        <button 
                            className={`btn theme-toggle-btn ms-2 ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? '🌞' : '🌙'}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
