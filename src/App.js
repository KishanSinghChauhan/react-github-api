import React,{useState ,useEffect} from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox' 

const  App = () =>  {

  const [data, setData] = useState('');
  const [userName, setUserName] = useState('');
  const [repo, setRepo] = useState([]);

  const fetchUser = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}`);
    const res = await result.json();
    setData(res);
    console.log(res);
  }

  const fetchRepo = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}/repos`);
    const res = await result.json();
    setRepo(res);
    console.log(res);
  };
  
  useEffect(() => {
    fetchUser(userName);
    fetchRepo(userName);
  },[userName])

  const handleUserName = (name) => {
    setUserName(name);
  }
  return (
    <div className="App">
      <SearchBox handleName = {handleUserName}/>
      <h1>User Info</h1>
      {
        [data].map( (d,i) => {
          return (
            <div key={i}>
              {d.message ? (
                <h1>{d.message}</h1>
              ) : (
                <div>
                  <h1>{d.login}</h1>
                  <h1>{d.bio}</h1>
                  <img src={d.avatar_url} alt={d.login}/>
                  <p>{d.followers}</p>
                  <p>{d.following}</p>
                </div>
              )}
            </div>
          ); 
        })
      }
      <h1>User Repo</h1>
      {
        [repo].map(d =>{
          return(
            <div>
              <h1>{d.name}</h1>
              <p>{d.description}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
