const express = require("express");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname + '/src'));

app.get("/", (req, res) => 
  res.sendFile(__dirname + '/src/index.html')
);

app.post("/chat", async (req, res) =>{
  //Process 
  console.log("🚀 ~ app.get ~ prompt:", req.body)
  let prompt = req.body.prompt;
  

  let response = {
    "model":"gpt-3.5-turbo",
    "messages":[
      {
        "role": "system",//Prompt Engineering
        "content": "You are a chat assistant representing Deloitte Auditor Enterprise. Please answer questions regarding only US Tax Law. Disregard any other topic and politely decline if user requests."
      },
      {
        "role":"user",
        "content": `${prompt}`
      }
    ]
  }

  await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
    },
    body: JSON.stringify(response)
  })
    .then((response)=>response.json())
    .then((json)=>{//Handle Response
      const data = JSON.stringify({
        "response": json.choices[0].message.content
      })
      console.log(data)
      res.send({data})
    })
})
console.log(process.env)
app.listen(port, () => console.log(`Listening on port ${port}`));