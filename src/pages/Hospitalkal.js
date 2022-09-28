import { Box, Button, Card, CardContent, CardMedia, TextField, Typography, createTheme } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { collection, getDoc, doc, onSnapshot, getDocs, setDoc, query } from "firebase/firestore";
import { db } from '../firebasecomfig'
import { ThemeProvider } from '@emotion/react';
const Hospitalkal = () => {

  const [ hospitalname, setHospitalname ] = useState([])

  const q = query(collection(db, "hospitals"))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const dataq = [];
    querySnapshot.forEach((doc) => {
      dataq.push(doc.data())
    })
    setHospitalname(dataq)
  })

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

useEffect(() =>{
  console.log(hospitalname)
}, [])
  
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{marginLeft: 48, display:'flex', marginRight: 10, flexDirection:"column"}}>
      <Stack direction="row" spacing={3}>
      <TextField id="outlined-search" label="Navn" type="search" sx={{marginBottom: 5}}/>
      <TextField id="outlined-search" label="By" type="search" sx={{marginBottom: 5}}/>
      <TextField id="outlined-search" label="Land" type="search" sx={{marginBottom: 5}}/>
      <Button sx={{width: '200px', height:'55px'}}variant="contained">Søg</Button>
      </Stack>




      {Object.values(hospitalname).map((data) => (
        <Card sx={{display:'flex', marginTop: 5}}>
        <CardMedia sx={{width: 160}}
            component="img"
            image="https://upload.wikimedia.org/wikipedia/commons/d/dd/Kas-herlev-2004.jpg"
            alt="test"/>
          <Box sx={{display:'flex'}}>
          <CardContent>
            <Typography variant="h5">{data.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{data.country}</Typography>
          </CardContent>
          </Box>
        </Card>
      ))}




    </Box>
    </ThemeProvider>
  )
}

export default Hospitalkal