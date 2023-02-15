import './App.css';
import {Route, Routes} from "react-router-dom";
import axios from 'axios';
import MainPage from "./components/main-page/main-page";
import SchedulePage from "./components/schedule-page/schedule-page";
import NavBar from "./components/navigation/navigation";
import LoginPage from "./components/login-page/login-page";
import RegisterPage from "./components/register-page/register-page";

axios.defaults.baseURL = 'https://food-delivery.kreosoft.ru/api';

function App() {
  return (
      <div>
          <NavBar/>
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/schedule" element={<SchedulePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
      </div>
  );
}

export default App;
