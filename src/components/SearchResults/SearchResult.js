import React from 'react'

const SearchResult = ({item}) => {
    const info = item.map((d, i) => {
        return (
          <div key={i}>
            {d.message ? (
              <h1>{d.message}</h1>
            ) : (
              <>
                <h1>{d.login}</h1>
                <h1>{d.bio}</h1>
                <img src={d.avatar_url} alt={d.login} />
                <p>{d.followers}</p>
                <p>{d.following}</p>
              </>
            )}
          </div>
        );
      });

    return (
        <>
            <h1>User Info</h1>
            {info}
        </>
    )
}

export default SearchResult
