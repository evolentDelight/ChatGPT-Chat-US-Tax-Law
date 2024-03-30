require('dotenv').config();

//When ChatGPT AI's response is received, load message onto front-end
function AI_Response(response){
  const response_element = document.getElementById("response");

  response_element.textContent = response;
}

//Extract Prompt from front-end
function extractPrompt(){
  const prompt = document.getElementById("prompt").value;
  
  if(prompt){
    return prompt;
  }

  alert("Please Enter Prompt")
  return null;
}

//AJAX to ChatGPT
async function inquirePrompt(){
  const prompt = extractPrompt();

  if(prompt){//REST call
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
        AI_Response(json.choices[0].message.content)
      })
  }
}

//Cancel Prompt by erasing prompt
function cancelPrompt(){
  document.getElementById("prompt").value = "";
}

//Event Listeners
//Cancel - Remove prompt
document.getElementById("cancelButton").addEventListener("click", cancelPrompt);

//Inquire/Submit button
document.getElementById("submitButton").addEventListener("click", inquirePrompt);
document.getElementById("prompt").addEventListener("keypress", (e)=>{
  if (e.key ==='Enter'){
    e.preventDefault();//Disables newline entered once "Enter" key is keyed
    inquirePrompt();
  }
})