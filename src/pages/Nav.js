
import { AccountCircle, Dashboard, EventAvailable, Gite, Mail, Settings } from '@mui/icons-material';
import { AppBar, Avatar, Button, Chip, createTheme, Drawer, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { auth } from '../firebasecomfig'
import { signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebasecomfig';
import Ably from "ably/promises"
import Profil from './Profil';


const Nav = () => {

 




  const {dispatch} = useContext(AuthContext)

  const navigate = useNavigate();

  function logout () {
    signOut(auth).then(()=>{
    dispatch({type:"LOGOUT", payload:null})
    navigate("/login")
    })
  }


const [userdata, setUserdata] = useState([])

async function getData (){
  const ref = (doc(db, "users", auth.currentUser.uid))
  const docSnap = await getDoc(ref)
   const dataArray = []
  if (docSnap.exists()) {
    setUserdata(docSnap.data())
    }
  }

  useEffect(()=> {
    getData()

  }, [])



  
  const drawerWidth = 300;

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

  const location = useLocation()

  const homecolor = location.pathname === "/" ? "#E63058"  : ""
  const homefont = location.pathname === "/" ? "bold": ""
  const profilcolor = location.pathname === "/profil" ? "#E63058"  : ""
  const profilfont = location.pathname === "/profil" ? "bold": ""
  const hospitalcolor = location.pathname === "/hospitalkal" ? "#E63058"  : ""
  const hospitalfont = location.pathname === "/hospitalkal" ? "bold": ""



  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, zIndex: (themes) => themes.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{bgcolor:"white", display:'flex', justifyContent:'flex-end', alignContent:'center'}}>
            <Typography sx={{marginRight:2}} color="black">{userdata.firstname} {userdata.lastname}</Typography>
            <Typography></Typography>
          <Avatar></Avatar>
          </Toolbar>
        </AppBar>

        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"        
        >
        <Toolbar />
        <List>
           <ListItem>
              <Typography sx={{color:"#E63058"}}>Main</Typography>
          </ListItem>  
          <ListItem>
            <ListItemButton onClick={() => {navigate('/')}}>
              <ListItemIcon>
                <Dashboard fontSize='large' sx={{color:homecolor}}/>
              </ListItemIcon>
              <Typography sx={{fontWeight:homefont, color:homecolor}}>Oversigt</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
          <ListItemButton onClick={() => {navigate('/profil')}}>
            <ListItemIcon>
              <AccountCircle fontSize='large' sx={{color:profilcolor}} />
            </ListItemIcon>
            <Typography sx={{fontWeight:profilfont, color:profilcolor}}>Se Profil / Ret Profil</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <EventAvailable fontSize='large' sx={{}}/>
          </ListItemIcon>
          <Typography sx={{}}>Ledigheds Kalender</Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
      <ListItemButton onClick={() => {navigate('/hospitalkal')}}>
        <ListItemIcon>
          <Gite fontSize='large' sx={{color:hospitalcolor}}/>
        </ListItemIcon>
        <Typography sx={{fontWeight:hospitalfont, color:hospitalcolor}}>Hospitaler</Typography>
      </ListItemButton>
    </ListItem>
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <Mail fontSize='large' sx={{}}/>
        </ListItemIcon>
        <Typography sx={{}}>Indboks</Typography>
      </ListItemButton>
    </ListItem>
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <Settings fontSize='large' sx={{}}/>
        </ListItemIcon>
        <Typography sx={{}}>Indstillinger</Typography>
      </ListItemButton>
    </ListItem>  
    <ListItem>
    </ListItem>
        </List>
        <Button onClick={logout} variant='contained' sx={{marginTop:'auto', marginBottom: 3, height: 50}}>Log Ud</Button>        
        </Drawer>
          <Box component="main"
          sx={{marginLeft:40 ,flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Toolbar />
          </Box>
      </ThemeProvider>
    </div>
  )
}

export default Nav