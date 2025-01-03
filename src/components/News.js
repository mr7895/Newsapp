import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const buildApiUrl = (pageNo) => {
    const baseUrl = props.searchQuery
      ? `https://gnews.io/api/v4/search?q=${props.searchQuery}&token=${props.apiKey}&page=${pageNo}&max=${props.pageSize}`
      : `https://gnews.io/api/v4/top-headlines?country=${props.country}&topic=${props.category}&token=${props.apiKey}&page=${pageNo}&max=${props.pageSize}`;

    return baseUrl;
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    setError(null);

    try {
      const url = buildApiUrl(page);
      const response = await fetch(url);
      props.setProgress(30);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsedData = await response.json();
      props.setProgress(70);

      if (parsedData.status === 'error') {
        throw new Error(parsedData.message || 'Failed to fetch news');
      }

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.message);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  const handlePrevClick = () => {
    setPage(prev => prev - 1);
  };

  const handleNextClick = () => {
    setPage(prev => prev + 1);
  };

  // Effect for page changes
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [page]);

  // Effect for search query changes
  useEffect(() => {
    setPage(1);
    updateNews();
    // eslint-disable-next-line
  }, [props.searchQuery, props.category]);

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        {props.searchQuery
          ? `Search Results for "${props.searchQuery}"`
          : `News - Top ${capitalizeFirstLetter(props.category)} Headlines`}
      </h1>

      {loading && <Spinner />}
      
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="alert alert-info text-center" role="alert">
          No articles found.
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <>
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={element.url || index}>
                <NewsItem
                  title={element.title || ''}
                  description={element.description || ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name || 'Unknown'}
                />
              </div>
            ))}
          </div>

          <div className="container d-flex justify-content-between my-3">
            <button 
              disabled={page <= 1} 
              type="button" 
              className="btn btn-dark" 
              onClick={handlePrevClick}
            >
              &larr; Previous
            </button>
            <span className="badge bg-info text-dark fs-5">
              Page {page} of {Math.ceil(totalResults/props.pageSize)}
            </span>
            <button 
              disabled={page >= Math.ceil(totalResults/props.pageSize)} 
              type="button" 
              className="btn btn-dark" 
              onClick={handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
