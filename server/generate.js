import openaiClient from "./api.js";

async function generate(queryDescription) {
    async function daVinci(queryDescription) {
        const response = await openaiClient.createCompletion({
            model: "text-davinci-003",
            prompt: `Convert the following natural language description into a SQL query: \n\n${queryDescription}.`,
            max_tokens: 100,
            temperature: 0
        });
        return response.data.choices[0].text;
    }
    
    async function chatGptApi(queryDescription) {
        const messages = [
            { role: "system", content: `You are a translator from plain English to SQL.`},
            { role: "user", content: `Convert the following natural language description into a SQL query: \n\nshow all elements from the table users.`},
            { role: "assistant", content: `SELECT * FROM users;`},
            { role: "user", content: `Convert the following natural language description into a SQL query: \n\n${queryDescription}.`}
        ];
        
        const response = await openaiClient.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages
        });
        return response.data.choices[0].message.content;
    }
    
    // return daVinci(queryDescription);
    return chatGptApi(queryDescription);
}

export default generate;