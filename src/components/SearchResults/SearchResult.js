import React from 'react'
import './SearchResults.scss'
const SearchResult = ({item}) => {
    const info = item.map((d, i) => {
        return (
          <div key={i}>
            {d.message ? (
              <h5>{d.message}</h5>
            ) : (
              <div className="profile-info">
                <img className="user-img" src={d.avatar_url} alt={d.login} />
                <h3>{d.login}</h3>
                <p>{d.bio}</p>
                <p className="follow">
                  Followers - <span>{d.followers}</span>
                </p>
                <p className="follow">
                  Following - <span>{d.following}</span>
                </p>
              </div>
            )}
          </div>
        );
      });

    return (
        <div className='profile'>
            {info}
        </div>
    )
}

export default SearchResult
