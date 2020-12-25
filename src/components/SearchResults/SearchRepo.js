import React from "react";

const SearchRepo = ({ item }) => {
  return (
    <>
      <h1>User Repo</h1>
      {item.length ? (
        item.map((d, i) => {
          return (
            <div key={i}>
              {i < 5 ? (
                <div>
                  <h1>{d.name}</h1>
                  <p>{d.description}</p>
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <h1>NO</h1>
      )}
    </>
  );
};

export default SearchRepo;
