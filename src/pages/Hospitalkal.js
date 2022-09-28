import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { doc, getDocs, onSnapshot, setDoc, collection } from 'firebase/firestore'
import { db } from '../firebasecomfig'
const Hospitalkal = () => {

  const [ hospitalname, setHospitalname ] = useState([])

  const hospitals = async () =>{
   const querySnapshot = await getDocs(collection(db, "hospitals"))
   querySnapshot.forEach((doc) => {
    setHospitalname(doc.data())
   })
  }

useEffect(() =>{
  hospitals()
}, [])
  
  return (
    <Box sx={{marginLeft: 48, display:'flex', marginRight: 10, flexDirection:"column"}}>
      <Stack direction="row" spacing={3}>
      <TextField id="outlined-search" label="Navn" type="search" sx={{marginBottom: 5}}/>
      <TextField id="outlined-search" label="By" type="search" sx={{marginBottom: 5}}/>
      <TextField id="outlined-search" label="Land" type="search" sx={{marginBottom: 5}}/>
      <Button sx={{width: '200px', height:'55px'}}variant="contained">Søg</Button>
      </Stack>


      {Object.values(hospitalname).map((data, i) => (
        <Card sx={{display:'flex'}}>
        <CardMedia sx={{width: 160}}
            component="img"
            image="https://upload.wikimedia.org/wikipedia/commons/d/dd/Kas-herlev-2004.jpg"
            alt="test"/>
          <Box sx={{display:'flex'}}>
          <CardContent>
            <Typography variant="h5">{data.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{data.country}</Typography>
            <Button sx={{width: '200px', height:'55px'}}variant="contained">Søg Ind</Button>
          </CardContent>
          </Box>
        </Card>
      ))}

    </Box>
  )
}

export default Hospitalkal