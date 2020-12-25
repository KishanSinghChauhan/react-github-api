import React, { useRef, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import _ from "lodash";
import SearchResult from "./components/SearchResults/SearchResult";
import SearchRepo from "./components/SearchResults/SearchRepo";
import { connect } from "react-redux";
import { selectUser, fetchUserAndRepos } from "./redux/action";

const App = ({ currentUser, currentUserData, userRepos, dispatch }) => {
  // const [data, setData] = useState([]);
  // const [userName, setUserName] = useState("");
  // const [repo, setRepo] = useState([]);

  // const [isSearching, setIsSearching] = useState(false);

  // const fetchUser = async (user) => {
  //   const result = await fetch(`https://api.github.com/users/${user}`);
  //   const res = await result.json();
  //   console.log(res);
  //   return res;
  // };

  // const fetchRepo = async (user) => {
  //   const result = await fetch(`https://api.github.com/users/${user}/repos`);
  //   const res = await result.json();
  //   console.log(res);
  //   return res;
  // };

  const debounceSearch = useRef(
    _.debounce((searchTerm) => {
      fetchUserAndRepos(searchTerm)
    }, 1000)
  );

  // useEffect(() => {
  //   if (userName) {
  //     setIsSearching(true);
  //     debounceSearch.current(userName);
  //   } else {
  //     setData([]);
  //     setRepo([]);
  //   }
  // }, [userName]);

  useEffect(() => {
    dispatch(debounceSearch.current(currentUser));
  })
  const handleUserName = (user) => {
    dispatch(selectUser(user));
  };

  return (
    <>
      <SearchBox handleName={handleUserName} />
      {currentUserData.isFetching && <div>Searching ...</div>}
      <SearchResult item={[currentUserData]} />
      <SearchRepo item={userRepos} />
    </>
  );
};

function mapStateToProps(state) {
  const { currentUser, currentUserData, userRepos } = state;
  return {
    currentUser,
    currentUserData,
    userRepos,
  };
}

export default connect(mapStateToProps)(App);
