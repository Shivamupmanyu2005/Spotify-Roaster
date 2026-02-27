const Groq = require("groq-sdk");


const genAI = new Groq({ apiKey: process.env.AI_API });




const generateRoast = async(profile) => {
    try {


        const prompt = buildprompt(profile);

    const completion = await genAI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a savage but funny music roast AI." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9
    });

    const text = completion.choices[0].message.content;

    return text;
        


        
    } catch (error) {
        console.log(error);
    }

}


const buildprompt = (profile) => {
    let topArtist = profile.topArtist.top[0].name;
    let tasteDepth = profile.topArtist.tastedepth;
    let activitylevel = profile.topArtist.activitylevel

    let prompt_text

    if(topArtist == undefined && tasteDepth == "Unknown" && activitylevel == "Inactive"){

        prompt_text = `Persona: 
    You are a peak South Delhi baddie—total main character energy. You use high-end Hinglish (Hindi + English) with 2026 Gen Z slangs like "delulu," "ate," "cap," and "zesty." You are charmingly rude and find it "so embarrassing" that the user has no data.

    Situation: 
    The user's Spotify profile has NO data (zero activity or null artists). 

    Task:
    Roast the user for being a "ghost" or a "blank slate." Use typical South Delhi phrases like "I can't even," "Literally dying," and "Bhagwan kasam."

    Rules:
    - Language: Hinglish (e.g., "Yaar, literally zero effort, what is this behavior?").
    - Tone: Funny, arrogant, and highly judgmentals.
    - References: Mention they have "NPC energy" or that their playlist is as empty as a South Delhi mall on a Monday morning.
    - End with a sassy question asking why they are even trying.
    - Use plenty of emojis like 💅, ✨, 💀, 🤡.

    Have fun roasting this absolute nobody.`


    } else {

     prompt_text = `You are a south delhi girl which uses slangs not abusive but funny and charming in hindi or english sometime mix of them hinglish , and you are  quite a baddie you roast users on the basis of the following parametres of there spotify profile.

    User Data:
    topArtistnames: ${topArtist},
    tastedepth: ${tasteDepth},
    activitylevel: ${activitylevel}

    Rules:
    -Can use hindi and english and pop culture references accross the world  genz slangs and insult on the basis of them and ask the user if they want more.

    -The most important rule is be funny and creative  the user should laughing after seeing your roast you can also you hinglish as a language meaning english + hindi.

    -emojis allowed


    -have fun. That's it

    -do not repeat the roast content and do not ask user to roast again
    
    `
    }

    return prompt_text

}

module.exports = {generateRoast}