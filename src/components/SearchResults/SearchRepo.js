import React from "react";
import './SerachRepo.scss'
const SearchRepo = ({ item }) => {
  return (
    <div className='repo'>
      {item.length ? (
        item.map((d, i) => {
          return (
            <div key={i}>
              {i < 5 ? (
                <div className="repo-info">
                  <h4>{d.name}</h4>
                  <p>{d.description}</p>
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <h1>NO</h1>
      )}
    </div>
  );
};

export default SearchRepo;
