import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './Component/Nav';
import AboutPage from './Pages/AboutPage';
import MainPage from './Pages/MainPage';
import ChatPage from './Pages/ChatPage';
import MakeMeet from './Component/MakeMeet';
import EditInfo from './Component/EditInfo';
import UserManner from './Component/UserManner';
import FoodPreference from './Component/FoodPreference'
import Footer from './Component/Footer'
import SignIn from './Component/SignIn'
import SignUp from './Component/SignUp'
import EmailCheck from './Component/EmailCheck'

function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false)
  const [certificationCode,setCertificationCode] = useState('')
  const [email, setEamil] = useState('')
  
  // const [userInfo, setUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    email: '',
    name: '',
    etiquette: null,
  })
  const generateCertificationCode = () => {
    const el = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const string_length = 20;
    let result = '';
    for (let i = 0; i < string_length; i++) {
      const rnum = Math.floor(Math.random() * el.length);
      result += el.substring(rnum, rnum + 1); 
   }
   
   return result
};

  const isAuthenticated = async () => {
    try {
      await axios.get('http://localhost:4000/auth')
        .then(res => {
          if (res.data) setUserInfo(res.data);
          console.log('isAuthenticated func runned')
        })
      .catch(err => console.log('authenticate failed'))
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    isAuthenticated();
  }, [])
  
  const logoutHandler = () => {

  }

  return (
    <BrowserRouter>
    <div className="app">
      <Nav isLogin={isLogin} logoutHandler={logoutHandler}/>
        
      <Switch>     
      <Route path='/login'>
          <SignIn />
        </Route>
        <Route path='/signup'>
            <SignUp setEamil={setEamil} email={email} setCertificationCode={setCertificationCode} certificationCode={certificationCode}/>
          </Route>
          <Route path='/editinfo'>
            <EditInfo />
          </Route>

        {/* 회원가입 시 */}
          <Route path='/emailcheck'>
            <EmailCheck email={email} certificationCode={certificationCode} />
          </Route>

          <Route path='/foodpreference'>
            <FoodPreference userInfo={userInfo}/>
          </Route>

          <Route path='/usermanner'>
            <UserManner userInfo={userInfo}/>
          </Route>
          
          <Route exact path='/'>
            {!userInfo.etiquette ? <Redirect to='/foodpreference' /> : <AboutPage />}
          </Route>

        <Route path='/main'>
        <MainPage />
          </Route>

        <Route path='/chat'>
        <ChatPage />
          </Route>
          
        <Route path='/makemeet'>
        <MakeMeet />
        </Route>

          
          

        </Switch>
        
      <Footer />
      </div>
      </BrowserRouter>
  );
}

export default App;
