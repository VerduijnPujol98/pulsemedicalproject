import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebasecomfig'
import { collection, getDoc, doc, onSnapshot, getDocs, setDoc, query } from "firebase/firestore";
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AccessTime, BookmarkAdd, CallReceived, Gite, LocationOn } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Ably from "ably/promises"
import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { Stack } from '@mui/system';





const Testest = () => {





  /////////////////////////////////////////REAL TIME NOTIFICATION AND SETTING DATA IN FIREBASE//////////////////////////////////////////


  configureAbly({ key: "grUuFA.MofqDQ:OOwuHpY3_PVRpTe34Sgf7cLhI_rNwi_3qQadpQ4Uvec", clientId: "Aalborg Sygehus" });


  const [noti, setNoti] = useState([])


  const [channel, ably] = useChannel("test", (message) => {
    console.log(message);
    setNoti(message)
    console.log(noti)
  });

  const sendMessage = async () => {
    channel.publish({ name: "myEventName", data: { text: "Har brug for dig.", country: "Norway", hospital: "Thisted Sygehus" } })
    await setDoc(doc(db, "feeds", noti.id), {
      text: noti.data.text,
      country: noti.data.country,
      hospital: noti.data.hospital,
      id: noti.id,
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////REAL TIME DATABASE LISTENER////////////////////////////////////////////



  const [userdata, setUserdata] = useState([])



  const q = query(collection(db, "feeds"))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const dataq = [];
    querySnapshot.forEach((doc) => {
      dataq.push(doc.data())
    })
    setUserdata(dataq)
  })
  

  useEffect(() => {
    console.log(userdata)
  }, [])




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








  return (
<Grid2 container spacing={5} sx={{paddingTop:3, paddingLeft: 1}} >
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 280}}>
                        <CardContent sx={{borderBottom: 1, borderBottomColor: '#E63058', borderBottomWidth:4, display: 'flex', flexDirection:'row'}}>
                          <Box>
                            <Typography variant="h3" color="#E63058">
                                43
                            </Typography>
                            <Typography sx={{paddingTop: 2}} variant="body1">
                                Applications Sent
                            </Typography>
                          </Box>
                          <Box display={'flex'} marginLeft={'auto'} marginBottom={'auto'}>
                            <IconButton>
                              <BookmarkAdd sx={{ fontSize: 40, color: '#E63058'}}/>
                            </IconButton>
                           </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 280}}>
                    <CardContent sx={{borderBottom: 1, borderBottomColor: '#E63058', borderBottomWidth:4, display: 'flex', flexDirection:'row'}}>
                          <Box>
                            <Typography variant="h3" color="#E63058">
                                5
                            </Typography>
                            <Typography sx={{paddingTop: 2}} variant="body1">
                                Applications Received
                            </Typography>
                          </Box>
                          <Box display={'flex'} marginLeft={'auto'} marginBottom={'auto'}>
                            <IconButton>
                              <CallReceived sx={{ fontSize: 40, color: '#E63058'}}/>
                            </IconButton>
                           </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 280}}>
                    <CardContent sx={{borderBottom: 1, borderBottomColor: '#E63058', borderBottomWidth:4, display: 'flex', flexDirection:'row'}}>
                          <Box>
                            <Typography variant="h3" color="#E63058">
                                43
                            </Typography>
                            <Typography sx={{paddingTop: 2}} variant="body1">
                                Applications Sent
                            </Typography>
                          </Box>
                          <Box display={'flex'} marginLeft={'auto'} marginBottom={'auto'}>
                            <IconButton>
                              <BookmarkAdd sx={{ fontSize: 40, color: '#E63058'}}/>
                            </IconButton>
                           </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 xs="auto">
                    <Card sx={{minWidth: 310, minHeight: 700}}>
                        <CardContent sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                            <Button onClick={sendMessage} variant="outlined">Notification</Button>










                              {Object.values(userdata).map((data, i) => (
                              <Box>
                                <Box sx={{ p: 2, display: 'flex'}}>
                                <Avatar variant="rounded" />
                                <Stack spacing={0.5} marginLeft={2}>
                                  <Typography fontWeight={600}>{data.hospital}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                   {data.country}
                                  </Typography>
                                </Stack>
                                </Box>
                                <Stack 
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                                >
                                  <Typography>
                                  {data.text}
                                  </Typography>
                                </Stack>
                              <Divider/>                                
                              </Box> 
                              ))}












                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
  )
}

export default Testest