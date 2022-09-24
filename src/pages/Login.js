import { AccountCircle, Key } from '@mui/icons-material'
import { Button, InputAdornment, Link, Paper, TextField, Typography, createTheme, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Mainlogo from "../components/Component40.png"
import { auth } from '../firebasecomfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const {dispatch} = useContext(AuthContext)

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)
    
    const navigate = useNavigate();
  
    const theme = createTheme({
        palette: {
        primary: {
            main: '#E63058',
        },
        secondary: {
            main: '#f44336',
        },
        },
    });


    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("Successfully Logged In")
            const user = userCredential.user;
            navigate("/")
            dispatch({type:"LOGIN", payload:user})
                
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Works")
            setError(true)
          });
      }
    
  return (
    <div>
    <ThemeProvider theme={theme}>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} flexWrap={'wrap'} bgcolor='#E63058'>
        <Paper sx={{minWidth: 400, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <Typography sx={{ marginTop:3}} variant='h4' fontWeight={'bold'}>Log In</Typography>
                <TextField onChange={event => setEmail(event.target.value)} sx={{width:'300px', marginTop:3}} label="Email" variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    )
                }}></TextField>
                <TextField onChange={event => setPassword(event.target.value)} sx={{width:'300px', marginTop:3}} label="Password" type="password" variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Key />
                        </InputAdornment>
                    )
                }}></TextField>
                
                <Button onClick={handleLogin} sx={{width:'300px', height:'50px', marginTop:3}} variant="contained">Sign In</Button>
                <Link href="/register" sx={{ marginTop:3, marginBottom:3}}>Don't have an account?</Link>
        </Paper>
    </Box>
    </ThemeProvider>
    </div>
  )
}

export default Login