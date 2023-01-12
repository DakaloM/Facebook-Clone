import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {useContext} from "react"
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Routes, Navigate,
  Route
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
function App() {

  const { user } = useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={user? <Home />: <Login/>}/>
        <Route path="/profile/:username" element={  <Profile />} />
        <Route path="/login" element={user? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user? <Navigate to="/" /> : <Register />} />
        <Route path="/messenger" element={!user? <Navigate to="/login" /> : <Messenger />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
