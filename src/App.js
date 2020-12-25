import React, { useRef, useEffect } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox/SearchBox";
import _ from "lodash";
import SearchResult from "./components/SearchResults/SearchResult";
import SearchRepo from "./components/SearchResults/SearchRepo";
import { connect } from "react-redux";
import { selectUser, requestUserInfo ,requestUserRepo} from "./redux/action";


const App = (props) => {
  const {
    onSearchChange,
      currentUser,
      onRequestUserInfo,
      isPending,
      userData,
      userRepo,
      onRequestUserRepo
  } = props
  const debounceSearch = useRef(
    _.debounce((searchTerm) => {
      onRequestUserInfo(searchTerm);
      onRequestUserRepo(searchTerm)
    }, 1000)
  );

  useEffect(() => {
    if(currentUser){
      debounceSearch.current(currentUser);
    }
  }, [currentUser]);

  return (
    <>
      <SearchBox onSearchChange={onSearchChange} />
      {!currentUser && isPending && <div>Searching ...</div>}
      <SearchResult item={[userData]} />
      <SearchRepo item={userRepo} />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.setUser.currentUser,
  userData: state.requestUserInfo.userData,
  userRepo: state.requestUserRepo.userRepo,
  isPending: state.requestUserInfo.isPending,
  error: state.requestUserInfo.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(selectUser(event.target.value)),
  onRequestUserInfo: (user) => dispatch(requestUserInfo(user)),
  onRequestUserRepo: (user) => dispatch(requestUserRepo(user)),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
