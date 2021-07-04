import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import EmployeeListPage from './components/EmployeeListPage/EmployeeListPage';
import { HashRouter, Route, Redirect } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import EmployeeListReducer from "./reducer/EmployeeListReducer";

const store = createStore(EmployeeListReducer)
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path="/loginpage" component={LoginPage}/>
        <Route path="/dashboardpage" component={EmployeeListPage}/>
        <Redirect from="/" to="/loginpage"/>
      </HashRouter>
    </Provider>
  );
}

export default App;
