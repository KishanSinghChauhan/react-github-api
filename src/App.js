import React,{useState ,useEffect} from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox' 

const  App = () =>  {

  const [data, setData] = useState('');
  const [userName, setUserName] = useState('')

  const fetchUser = async (user) => {
    const result = await fetch(`https://api.github.com/users/${user}`);
    const res = await result.json();
    setData(res);
    console.log(res);
  }
  
  useEffect(() => {
    fetchUser(userName);
  },[userName])

  const handleUserName = (name) => {
    setUserName(name);
  }
  return (
    <div className="App">
      <SearchBox handleName = {handleUserName}/>
      {
        [data].map( (d,i) => {
          return (
            <div key={i}>
              {d.message ? (
                <h1>{d.message}</h1>
              ) : (
                <div>
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
    </div>
  );
}

export default App;
