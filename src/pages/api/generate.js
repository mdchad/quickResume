import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.profession, req.body.skill),
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(completion.data.choices[0])
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(profession, skills) {
  return `
  Write a resume with professional output as follow, experience worked as a ${profession} at Sensorflow Inc using ${skills} from 2018 to 2020 with format: 
    Company,
    Role,
    Year,
    Job Description: in bullet points,
  `
  // return `Write a detailed resume for a ${profession} that comprises of firstly a list of skills that includes ${skills},
  //  secondly a long summary describing his role as a ${profession} and
  //  lastly a detailed version of its professional experience together with his responsibilities in a bullet list form which includes 1) Sensorflow: June 2019 to present, 2) Pomelo Pay: March 2017 to May 2019, 3) Mingle Health: September 2016 to February 2017.
  // `
}
