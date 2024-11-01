// The OpenAI node module to be used with the zod helper which will help us parse the response from AI
const OpenAI = require("openai");
const { zodResponseFormat } = require("openai/helpers/zod");
const z = require("zod");

const ai = new OpenAI();
const responseSchema = z.object({
  sentiment: z.string(),
});
//This is the utility that will send messages to AI and get some type of response back
async function analyzeSentiment(tvShow, review) {
  const reviewTemplate = `Can you analyze sentiment in this tv show of ${tvShow}? "${review}" Please only provide 1 to 2 words. `;
  const msg = await ai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are helping to analyze sentiment for tv show reviews and you will be providing sentiment",
      },
      {
        role: "user",
        content: reviewTemplate,
      },
    ],
    response_format: zodResponseFormat(responseSchema, "sentiment_response"),
    model: "gpt-4o-mini",
  });
  console.log(msg);
  const result = msg.choices[0].message;
  console.log(result)
  const parsed = responseSchema.safeParse(JSON.parse(result.content));
  if (parsed.success) {
    return {
      success: true,
      sentiment: parsed.data.sentiment,
    };
  } else {
    return {
      success: false,
      sentiment: "",
    };
  }
}

module.exports = {
  analyzeSentiment,
};
