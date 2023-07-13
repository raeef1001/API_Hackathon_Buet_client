import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
const Voice = (props) => {
    const commands = [
        {
            command: "create a story book *",
            callback: (prompt) => {
            
              console.log(20000)
              bookmaker(prompt)
            },
          },
        
        {
          command: "change background colour to *",
          callback: (color) => {
            document.body.style.background = color;
            console.log(20000)
          },
        },
        {
          command: "reset",
          callback: () => {
            handleReset();
          },
        },
        ,
        {
          command: "hey chat *",
          callback: (prompt) => {
            chat(prompt)
          },
        },
      ];
      const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return (
        <div className="mircophone-container">
          Browser is not Support Speech Recognition.
        </div>
      );
    }
    const handleListing = () => {
      setIsListening(true);
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({
        continuous: true,
      });
    };
    const stopHandle = () => {
      setIsListening(false);
      microphoneRef.current.classList.remove("listening");
      SpeechRecognition.stopListening();
    };
    const handleReset = () => {
      stopHandle();
      resetTranscript();
    };
//  

// bookmaker 
const bookmaker = (prompt)=>{
                console.log(10000)
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
                  props.setpdf(response.data)
                  console.log(props.pdfurl)
                })
                .catch((error) => {
                  console.log(error);
                })
}

// chat-gpt 
const chat = (prompt)=>{
    console.log(10000)
    let data = JSON.stringify({
      "prompt": `${prompt}`
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
    })
    .catch((error) => {
      console.log(error);
    })
}
    return (
   
        <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListing}
          >
            <img src='https://icon-library.com/images/ios-microphone-icon/ios-microphone-icon-18.jpg' width={40} className="microphone-icon" />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening........." : "Click to start Listening"}
          </div>
          {isListening && (
            <button className="microphone-stop btn" onClick={stopHandle}>
              Stop
            </button>
          )}
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <button className="microphone-reset btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    );
};

export default Voice;