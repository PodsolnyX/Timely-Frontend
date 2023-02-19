import './App.css';
import MainPage from "./components/main-page/main-page";
import {Route, Routes} from "react-router-dom";
import SchedulePage from "./components/schedule-page/schedule-page";
import NavBar from "./components/navigation/navigation";
import LoginPage from "./components/login-page/login-page";
import RegisterPage from "./components/register-page/register-page";

function App() {
  return (
      <div className={""}>
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
