import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./components/body/Body";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {get_token, login, logout} from "./store/reducers";
import {getMyAccount} from "./services";

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.tokenReducer.token)
  const auth = useSelector(state => state.authReducer)

  useEffect(() => {
    const logInOnStartUp = localStorage.getItem('logInOnStartUp')
    if(logInOnStartUp){
      const getToken = async () => {
        const res = await axios.post('/api/auth/refresh_token', null)
        dispatch(get_token(res.data.access_token))
      }
      getToken()
    }
  },[auth.isLogged, dispatch]) //

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(login())
        dispatch(getMyAccount(token))
      }
      getUser()
    }
  },[token, dispatch])

  return (
      <Router>
          <div className="App">
              <Header />
              <Body />
          </div>
      </Router>

  );
}


export default App;
