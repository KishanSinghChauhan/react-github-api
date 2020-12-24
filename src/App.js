import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import _ from "lodash";

const App = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [repo, setRepo] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const fetchUser = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}`);
    return await result.json();
    
  };

  const fetchRepo = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}/repos`);
    return await result.json();
  };

  const debounceSearch = useRef(
    _.debounce((searchTerm) => {
      fetchUser(searchTerm).then((results) => {
        setIsSearching(false);
        setData(results);
      });
      fetchRepo(searchTerm).then((results) => {
        setIsSearching(false);
        setRepo(results);
      });
    }, 1000)
  );

  useEffect(() => {
    if (userName) {
      setIsSearching(true);
      debounceSearch.current(userName);
    } else {
      setData([]);
      setRepo([]);
    }
  }, [userName]);

  const handleUserName = (name) => {
    setUserName(name);
  };
  return (
    <div className="App">
      <SearchBox handleName={handleUserName} />
      {isSearching && <div>Searching ...</div>}
      <h1>User Info</h1>
      {[data].map((d, i) => {
        return (
          <div key={i}>
            {d.message ? (
              <h1>{d.message}</h1>
            ) : (
              <div>
                <h1>{d.login}</h1>
                <h1>{d.bio}</h1>
                <img src={d.avatar_url} alt={d.login} />
                <p>{d.followers}</p>
                <p>{d.following}</p>
              </div>
            )}
          </div>
        );
      })}
      <h1>User Repo</h1>
      {repo.map((d,i) => {
        return (
          <div key={i}>
            <h1>{d.name}</h1>
            <p>{d.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
