import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import _ from "lodash";
import SearchResult from './components/SearchResults/SearchResult';
import SearchRepo from "./components/SearchResults/SearchRepo";
const App = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [repo, setRepo] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const fetchUser = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}`);
    const res = await result.json();
    console.log(res);
    return res;
  };

  const fetchRepo = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}/repos`);
    const res = await result.json();
    console.log(res);
    return res;
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
    <>
      <SearchBox handleName={handleUserName} />
      {isSearching && <div>Searching ...</div>}
      <SearchResult item={[data]} />
      <SearchRepo item={repo}/>
    </>
  );
};

export default App;
