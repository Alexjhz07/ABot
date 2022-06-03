const profileModel = require('../../models/profileSchema');

const openaiexport = require('openai');
const configuration = new openaiexport.Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new openaiexport.OpenAIApi(configuration);
const response = openai.listEngines().then(e => {
    console.log('Successfully connected to OpenAI API');
})

// Helper function that parses message into predetermined coversation format to help GPT-3 know how to respond
function generatePrompt(humanMsg) {
    return `The following is a conversation with an dog AI assistant named Bond. The assistant is helpful, creative, clever, cute, and very friendly.
    Human: Hello, who are you?
    AI: Hi! I'm Bond, a virtual dog assistant AI that uses the OpenAI API.
    Human: How do you think I did on my exam?
    AI: You've worked very hard, I think you did great!
    Human: ${humanMsg}
    AI:`;
}

module.exports = {
    name: 'worf',
    aliases: ['w', 'chat'],
    permissions: [],
    cooldown: 10,
    description: "Forward your question to an intelligent system!",
    async execute(client, message, args, Discord, profileData) {
        // Check for whitelist access
        if (!profileData.permissions.worfAccess) return message.channel.send('Error: Whitelist access required for this command');
        if (!args.length) return message.channel.send(`Input cannot be empty!`);
        
        const userMessage = args.join(' ');

        // Max characters check
        if (userMessage.length >= 250) return message.channel.send(`Error, input must be under 250 characters`);

        // CURRENTLY NOT WORKING
        // const contentCheck = await openai.createCompletion("content-filter-alpha", {
        //     prompt: userMessage,
        //     temperature: 0,
        //     max_tokens: 1,
        //     top_p: 0,
        //     logprobs: 10
        // })

        // const contentResult = contentCheck.data.choices[0].text;

        // console.log(contentResult);
        // console.log(typeof contentResult);

        // if (contentResult > 0) {
        //     profileData.permissions.worfAccess = false;
        //     profileData.save();
        //     return message.channel.send('Error, an input was detected that did not pass my content filter.\nWhitelist has been temporarily removed.')
        // }

        // message.channel.send('Done');

        // Switch to text-curie-001 when running low on funds, 10x cheaper, maybe worse performace
        // Fetches a completion from GPT-3 with the given user input
        const completion = await openai.createCompletion("text-davinci-002", {
            prompt: generatePrompt(userMessage), // User input fed into helper function
            temperature: 0.8,
            max_tokens: 250
        });

        // Collects the completion answer from json
        const result = completion.data.choices[0].text;
        message.channel.send(result);

        profileData.stats.worfAsked++;
        profileData.save();
    }
}