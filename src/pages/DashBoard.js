import { Button } from '@mui/material'
import React from 'react'
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebasecomfig'
import { signOut } from "firebase/auth";
import { useContext } from 'react';


const DashBoard = () => {

    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext)

  function logout () {
    signOut(auth).then(()=>{
    dispatch({type:"LOGOUT", payload:null})
    navigate("/login")
    })
  }
  return (
    <div>
        <Button onClick={logout} variant='outlined'>Sign out</Button>
    </div>
  )
}

export default DashBoard