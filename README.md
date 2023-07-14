BUET CSE Fest 2023 Hackathon - Vanguard by Team Vanguard
As part of the "API and Cloud Services" segment of the BUET CSE FEST Hackathon, we were tasked with creating a ChatGPT powered chatbot which can take speech, text files and even images as input. Not only that, but this program can also generate illustrated stories for small children in PDF format.
API_ENDPOINT = https://apihackathon-1qlm.onrender.com/
How to run Vanguard:
npm start

The problem : 


There were several tasks to be completed:

Make a Chatbot which can accept speech as input and also speak the output;
Allow the Chatbot to accept text files, images etc. as images;
Generate a Children’s story book on Command;
Make a file sharing system for all the generated e-books.



What we solved:
1. Chatbot was successfully developed
2. Chatbot can accept speech, images and text files as input
3. Children’s story book can be generated successfully
4. Generated story book is available as a viewable and downloadable PDF
5. Phases 1, 2 and 4 completely solved and Phase 3 partially solved.
Problems:
File sharing system could not be implemented; 

The APIs we used : 
1. https://ocr.space/ocrapi
2. https://openai.com/blog/openai-api
3. https://docs.apitemplate.io/api/index.html#introduction
4. voice to text api
5. text to voice api

Our Tech Stack:
	Front-End:- React,Tailwindcss
	Back-End:- NodeJs, express
	Database:- mongodb
