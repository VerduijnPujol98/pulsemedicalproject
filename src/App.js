import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  console.log(currentUser)

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path="/" index element={
          <RequireAuth>
            <DashBoard/>
          </RequireAuth>
        }/>
       
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
