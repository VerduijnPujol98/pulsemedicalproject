import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Nav from "./pages/Nav";
import Profil from "./pages/Profil";
import Hospitalkal from "./pages/Hospitalkal";


function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }



  console.log(currentUser)


  return (
    <Router>
      <Routes>
      <Route path="/Login" element={<Login/>} />
        <Route element={ <div><Nav/><Outlet/></div>}>
          <Route path="/" element={
            <RequireAuth>
              <DashBoard/>
            </RequireAuth>
          }/>
          <Route path="/settings" element={
            <RequireAuth>
            </RequireAuth>
          }/>
          <Route path="/profil" element={
            <RequireAuth>
              <Profil/>
            </RequireAuth>
          }/>
          <Route path="/hospitalkal" element={
            <RequireAuth>
              <Hospitalkal/>
            </RequireAuth>
          }/>
        </Route>
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
