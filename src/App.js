import './App.css';
import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : 'white';
    document.body.style.color = isDarkMode ? 'white' : 'black';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  // Reset page when searching
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Clear search when changing categories
  const handleCategoryChange = () => {
    setSearchQuery("");
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        <NavBar 
          onSearch={handleSearch} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
        /> 
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Switch>
          <Route exact path="/">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`general-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="general"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route> 
          <Route exact path="/business">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`business-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="business"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route>
          <Route exact path="/entertainment">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`entertainment-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="entertainment"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route>
          <Route exact path="/health">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`health-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="health"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route>
          <Route exact path="/science">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`science-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="science"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route>
          <Route exact path="/sports">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`sports-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="sports"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route>
          <Route exact path="/technology">
            <News 
              setProgress={setProgress} 
              apiKey={apiKey} 
              key={`technology-${searchQuery}`} 
              pageSize={pageSize} 
              country="us" 
              category="technology"
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;