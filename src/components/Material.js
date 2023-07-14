import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
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
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEffect, useState } from "react";
import { SayButton } from 'react-say';
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
    const [pdfUrl,setPdfUrl] = useState('')
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
    await fetch(`https://apihackathon-1qlm.onrender.com/ocr/${url}`)
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
    const findStoryKeyWord = (text) => {
      let keywords = ["storybook", "story book", "story-book"];
      for (let key of keywords) {
          if ((text.toLowerCase()).includes(key)) {
             return true;
          }
      }
      return false;
  }

    console.log('Text:', usertext);
    setText('')
    if (findStoryKeyWord(usertext)) {
      bookmaker(usertext)
    }
    else{
      sender(usertext)
    }
   
    
  };

  // sending text to the server 
  const sender=(usertext)=>{

    let data = JSON.stringify({
      "prompt": `${usertext}`
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apihackathon-1qlm.onrender.com/chat',
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
        url: 'https://apihackathon-1qlm.onrender.com/text',
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
          <Typography className='text-red' variant="h6" color="inherit" noWrap>
            Vanguard
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
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            <h1>using voice command</h1>
              <ul className='font-[18px]'>
                <li className='font-[16px]'>
                  Start with 'hey chat' and then give your prompt over voice
                </li>
                <li className='font-[16px]'>
                  Start with 'create a story book' and then give your prompt to generate storybook over voice
                </li>
               
               

              </ul>
              <h1>using text command</h1>
              <ul>
              
                <li className='font-[18px]'>
                  write any request to perform by our chat ai
                </li>
                <li className='font-[18px]'>
                  use story book word into your request to make a storybook pdf. example : make a storybook on spiderman
                </li>
              </ul>
              <h1>using text command</h1>
              <ul>
              
                <li className='font-[18px]'>
                 wait patiently for the response to 
                </li>
                <li className='font-[18px]'>
                  use story book word into your request to make a storybook pdf
                </li>
              </ul>
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Response
            </Typography>
            <Typography  variant="h5" align="center" color="text.secondary" paragraph>
             <div className='bg-red-400'> {chatResponse}</div>
            </Typography>
           


            {/* input field  */}

            <Box 
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '25ch' },display:"inline"}}
      noValidate
      autoComplete="off"
    >
     
      <TextField className='' id="standard-basic" label="prompt" variant="standard" onChange={handleChangetext}/>
    </Box>

    {/* button box  */}
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
      onClick={handleSubmit}
        label="submit"
        value="recents"
        icon={< SendRoundedIcon from />}
      />
      <BottomNavigationAction
        label="image"
        value="favorites"
        id="upload_widget"
        onClick={() => myWidget.open()}
       
        icon={< ImageRoundedIcon />}
      />
      
     
      
      <Voice setpdf={setPdfUrl} pdfurl={pdfUrl} chatResponse={chatResponse} setChatResponse={setChatResponse}></Voice>
      <SayButton
    onClick={ event => console.log(event) }
    speak={chatResponse}
  >
    audio response
  </SayButton>
    </BottomNavigation>
    <br />
    <br />
    <br />
    <br /> <br />

    <center>
		<h1>PDF will be shown </h1>
		<h3>Embedding the PDF file Using embed Tag</h3>
		<embed src={pdfUrl}
			width="800"
			height="500"></embed>
	</center>
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
          a platform by vanguard
        </Typography>
        <Copyright />
      </Box>
      
      {/* End footer */}
    </ThemeProvider>
    
  );

};

export default Material;