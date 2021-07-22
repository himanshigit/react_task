import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import ListMovies from './components/ListMovies/ListMovies';
import { HashRouter, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function App(props) {
  return (
      <HashRouter>
        <Route path="/loginpage" component={LoginPage}/>
        <Route path="/ListMovies" component={ListMovies}/>
        <Redirect from="/" to="/ListMovies"/>
      </HashRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.UserAuthenticatedReducer.isUserAuthenticated
  }
}

export default connect(mapStateToProps)(App);
