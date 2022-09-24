import { AccountCircle, Badge, Key } from '@mui/icons-material'
import { Button, InputAdornment, Link, Paper, TextField, Typography, createTheme, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Mainlogo from "../components/Component40.png"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebasecomfig'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebasecomfig'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [firstname, setFirstname] = useState("")

    const [lastname, setLastname] = useState("")

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

    function SignUp (){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User Created")

            async function CreateData(){
                await setDoc(doc(db, "users", user.uid), {
                    email: email,
                    uid: user.uid,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                })
                console.log("UserDatabase Created")
            }
            CreateData()
            navigate("/login")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

  return (
    <div>
    <ThemeProvider theme={theme}>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} flexWrap={'wrap'} bgcolor='#E63058'>
        <Paper sx={{minWidth: 400, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <Typography sx={{ marginTop:3}} variant='h4' fontWeight={'bold'}>Register</Typography>
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
                <TextField onChange={event => setFirstname(event.target.value)} sx={{width:'300px', marginTop:3}} label="First Name" variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Badge />
                        </InputAdornment>
                    )
                }}></TextField>
                <TextField onChange={event => setLastname(event.target.value)} sx={{width:'300px', marginTop:3}} label="Last Name" variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Badge />
                        </InputAdornment>
                    )
                }}></TextField>
                <Button onClick={SignUp} sx={{width:'300px', height:'50px', marginTop:3}} variant="contained">Sign Up</Button>
                <Link href="/login" sx={{ marginTop:3, marginBottom:3}}>Already have an account?</Link>
        </Paper>
    </Box>
    </ThemeProvider>
    </div>
  )
}

export default Register