import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from "react";
import Voice from "./Voice";
import axios from "axios";
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const cards = [1, 2, 3];
  
  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();


//   starting main file 

const Material = () => {
    const [value, setValue] = React.useState('recents');           // button 
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

      // chat handle  
    const [usertext, setuserText] = useState("");                   
    const [text, setText] = useState('');
    const [pdfUrl,setPdfUrl] = useState('https://pub-cdn.apitemplate.io/2023/07/4543145d-9919-4b81-8e17-3a44b48f70d3.pdf')
      const [chatResponse,setChatResponse] = useState('')
   


    // image taken 
    const [url, setUrl] = useState(
        "https://assets.materialup.com/uploads/77a5d214-0a8a-4444-a523-db0c4e97b9c0/preview.jpg"
      );
    const [data, setData] = useState(["upload your image first", 1]);
  const cloudName = "hzxyensd5";
  const uploadPreset = "aoh4fpwm";
  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        var newurl = result.info.secure_url;
        var otherUrl = encodeURIComponent(result.info.secure_url);
        setUrl(newurl);
        server(otherUrl)
       
      }
    }
    
  );

  // fetching ocr from server 
  async function server(url) {
    await fetch(`http://localhost:5000/ocr/${url}`)
      .then((res) => console.log(res))
      .then((data) => setChatResponse(data))
      .catch(function (error) {
        console.log(error);
      });
  }


  const handleChangetext = (event) => {
    setuserText(event.target.value);
  };

  const handleSubmit = (event) => {
    // You can perform any necessary actions with the text here
    console.log('Text:', usertext);
    setText('')
   sender(usertext)
    
  };
  
  // sending text to the server 
  const sender=(usertext)=>{

    let data = JSON.stringify({
      "prompt": `${usertext}`
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/chat',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setChatResponse(response.data)
      console.log(chatResponse)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

const bookmaker=(prompt)=>{
    let data = JSON.stringify({
        "prompt": `${prompt}`
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/text',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setPdfUrl(response.data)
        console.log(pdfUrl)
      })
      .catch((error) => {
        console.log(error);
      });
}


    return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {chatResponse}
            </Typography>


            {/* input field  */}

            <Box
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '25ch' },display:"inline"}}
      noValidate
      autoComplete="off"
    >
     
      <TextField id="standard-basic" label="Standard" variant="standard" onChange={handleChangetext}/>
    </Box>

    {/* button box  */}
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
      onClick={handleSubmit}
        label="submit"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="image"
        value="favorites"
        id="upload_widget"
        onClick={() => myWidget.open()}
       
        icon={<FavoriteIcon />}
      />
      
     
      <BottomNavigationAction label="file" value="folder" icon={<FolderIcon />} />
      
    </BottomNavigation>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={()=>bookmaker(usertext)}>Make a storybook</Button>
              <Button variant="outlined"><a href={pdfUrl}>Open pdf</a></Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      
      {/* End footer */}
    </ThemeProvider>
    
  );

};

export default Material;