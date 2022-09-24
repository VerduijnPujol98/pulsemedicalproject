import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebasecomfig'
import { collection, getDoc, doc, onSnapshot, getDocs, query } from "firebase/firestore";
import { Grid, Paper, Typography } from '@mui/material';
import { Gite } from '@mui/icons-material';

const Testest = () => {



  const [userdata, setUserdata] = useState([])

  async function Retrieve() {
    const querySnapshot = await getDocs(collection(db, auth.currentUser.uid));
    querySnapshot.forEach((doc) => {
      setUserdata(doc.data())
    })
  }

  useEffect(() => {
    Retrieve()
  }, [])



  return (
    <Grid container spacing={3}>
      <Grid xs="auto">
        <Paper>{Object.entries(userdata).map(([keys, value]) => (
          <Typography key={keys}>{value}</Typography>
        ))}</Paper>
      </Grid>
    </Grid>
  )
}

export default Testest