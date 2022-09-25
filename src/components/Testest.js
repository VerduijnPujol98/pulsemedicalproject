import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebasecomfig'
import { collection, getDoc, doc, onSnapshot, getDocs, query } from "firebase/firestore";
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AccessTime, BookmarkAdd, Gite } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2';

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
<Grid2 container spacing={7} sx={{paddingTop:3, paddingLeft: 1}} >
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 280}}>
                        <CardContent sx={{borderBottom: 1, borderBottomColor: '#5ACD4A', borderBottomWidth:4, display: 'flex', flexDirection:'row'}}>
                          <Box>
                            <Typography variant="h3" color="#5ACD4A">
                                43
                            </Typography>
                            <Typography sx={{paddingTop: 2}} variant="body1">
                                Applications Sent
                            </Typography>
                          </Box>
                          <Box display={'flex'} marginLeft={'auto'} marginBottom={'auto'}>
                            <IconButton>
                              <BookmarkAdd sx={{ fontSize: 40, color: '#5ACD4A'}}/>
                            </IconButton>
                           </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 280}}>
                    <CardContent sx={{borderBottom: 1, borderBottomColor: '#5ACD4A', borderBottomWidth:4, display: 'flex', flexDirection:'row'}}>
                          <Box>
                            <Typography variant="h3" color="#5ACD4A">
                                5
                            </Typography>
                            <Typography sx={{paddingTop: 2}} variant="body1">
                                Applications Received
                            </Typography>
                          </Box>
                          <Box display={'flex'} marginLeft={'auto'} marginBottom={'auto'}>
                            <IconButton>
                              <BookmarkAdd sx={{ fontSize: 40, color: '#5ACD4A'}}/>
                            </IconButton>
                           </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 280}}>
                    <CardContent sx={{borderBottom: 1, borderBottomColor: '#5ACD4A', borderBottomWidth:4, display: 'flex', flexDirection:'row'}}>
                          <Box>
                            <Typography variant="h3" color="#5ACD4A">
                                43
                            </Typography>
                            <Typography sx={{paddingTop: 2}} variant="body1">
                                Applications Sent
                            </Typography>
                          </Box>
                          <Box display={'flex'} marginLeft={'auto'} marginBottom={'auto'}>
                            <IconButton>
                              <BookmarkAdd sx={{ fontSize: 40, color: '#5ACD4A'}}/>
                            </IconButton>
                           </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 310, minHeight: 700}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                                benevolent
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
                            </Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid2>
            </Grid2>
  )
}

export default Testest