import React, { useState, useEffect , useRef} from 'react';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import { AppContext } from './AppContext';
import './App.css';
import SignupForm from './Signupform/SignUpForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [fileDataUrls , setFileDataUrls ] = useState([])
  let router = useRoutes(routes);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (name && email && password) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignup = (userData) => {
       localStorage.setItem('name', userData.name);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('password', userData.password);
    setIsLoggedIn(true);
  };

  const setFileDataUrl = (url) =>{
    setFileDataUrls((prev)=>[...prev , url])
  }
  return (
    <>
      {!isLoggedIn && <SignupForm onSignup={handleSignup} />}
      {isLoggedIn && (
        <AppContext.Provider value={{fileDataUrls , setFileDataUrl}}>
          <Topbar />
          <div className="App-container">
            <Sidebar />
            {router}
          </div>
        </AppContext.Provider>
      )}

    </>
  );
}










