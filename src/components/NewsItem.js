import React, { useState } from 'react'

const NewsItem = (props)=> {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { title, description, imageUrl, newsUrl, author, date, source } = props;
    
    // Calculate reading time
    const getReadingTime = (text) => {
        const wordsPerMinute = 200;
        const words = text?.split(/\s+/)?.length || 0;
        return Math.ceil(words / wordsPerMinute);
    };
    
    const readingTime = getReadingTime(description);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        // Save to localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        if (!isBookmarked) {
            localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, props]));
        } else {
            localStorage.setItem('bookmarks', JSON.stringify(
                bookmarks.filter(item => item.newsUrl !== newsUrl)
            ));
        }
    };

    return (
        <div className="my-3">
            <div className="card">
                <div className="bookmark-badge">
                    <span className="badge rounded-pill bg-danger">{source}</span>
                    <button 
                        className="btn btn-link"
                        onClick={toggleBookmark}
                    >
                        {isBookmarked ? '★' : '☆'}
                    </button>
                </div>
                <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className="card-footer">
                        <small className="text-muted">
                            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
                            <span className="ms-2">·</span>
                            <span className="ms-2">{readingTime} min read</span>
                        </small>
                    </div>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark mt-2">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
