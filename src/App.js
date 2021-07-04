import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import EmployeeListPage from './components/EmployeeListPage/EmployeeListPage';
import { HashRouter, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function App(props) {
  return (
      <HashRouter>
        <Route path="/loginpage" component={LoginPage}/>
        {
          props.userAuth ? (<Route path="/dashboardpage" component={EmployeeListPage}/>) : (<Route path="/dashboardpage"><Redirect to="/loginpage"/></Route>)
        }
        <Redirect from="/" to="/loginpage"/>
      </HashRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.UserAuthenticatedReducer.isUserAuthenticated
  }
}

export default connect(mapStateToProps)(App);
