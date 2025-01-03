import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Build the API URL
  const buildApiUrl = (pageNo) => {
    const baseUrl = props.searchQuery
      ? `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}&sortBy=publishedAt`
      : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;

    return baseUrl;
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    try {
      const url = buildApiUrl(page);
      let data = await fetch(url);
      props.setProgress(30);

      const parsedData = await data.json();
      props.setProgress(70);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
    props.setProgress(100);
  };

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  useEffect(() => {
    setPage(1); // Reset page when search query changes
    updateNews();
    // eslint-disable-next-line
  }, [props.searchQuery]);

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        {props.searchQuery
          ? `Search Results for "${props.searchQuery}"`
          : `News - Top ${capitalizeFirstLetter(props.category)} Headlines`}
      </h1>

      {loading && <Spinner />}

      <div className="row">
        {!loading && articles.map((element, index) => {
          return (
            <div className="col-md-4" key={element.url || index}>
              <NewsItem
                title={element.title || ''}
                description={element.description || ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          );
        })}
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
