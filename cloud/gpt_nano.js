import OpenAI from "openai";
import 'dotenv/config';

// const token = process.env["GITHUB_PAT"]
const token = "GITHUB_PAT";
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-nano";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user", content: "hey? can you reply?" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model
    });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

