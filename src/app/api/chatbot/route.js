// import { GoogleGenAI, Type } from "@google/genai";

// // Initialize the API
// const genAI = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
// });
// // Simplified fake news report schema
// const fakeNewsReportSchema = {
//   description: "Simplified fake news detection report",
//   type: Type.OBJECT,
//   properties: {
//     fake_news_report: {
//       type: Type.OBJECT,
//       properties: {
//         textual_linguistic_analysis: {
//           type: Type.OBJECT,
//           description: "Analysis of textual and linguistic features",
//           properties: {
//             sentiment_analysis: {
//               type: Type.OBJECT,
//               description: "Analysis of tone and emotional impact",
//               properties: {
//                 tone: {
//                   type: Type.STRING,
//                   description:
//                     "Primary tone (e.g., neutral, sensational, negative)",
//                 },
//                 emotional_score: {
//                   type: Type.NUMBER,
//                   description:
//                     "Emotional intensity (0 to 1, higher is more emotional)",
//                 },
//               },
//               required: ["tone", "emotional_score"],
//             },
//             readability_score: {
//               type: Type.NUMBER,
//               description:
//                 "Flesch-Kincaid readability score (higher is easier to read)",
//             },
//           },
//           required: ["sentiment_analysis", "readability_score"],
//         },
//         source_contextual_analysis: {
//           type: Type.OBJECT,
//           description: "Analysis of source credibility and fact-checking",
//           properties: {
//             source_credibility: {
//               type: Type.OBJECT,
//               description: "Evaluation of the publisher's reputation",
//               properties: {
//                 publisher: {
//                   type: Type.STRING,
//                   description: "Name of the publisher or news outlet",
//                 },
//                 reputation_score: {
//                   type: Type.STRING,
//                   description:
//                     "Reputation assessment (e.g., Reputable, Questionable, Satire)",
//                 },
//               },
//               required: ["publisher", "reputation_score"],
//             },
//             fact_checking: {
//               type: Type.OBJECT,
//               description: "Fact-checking results",
//               properties: {
//                 fact_check_results: {
//                   type: Type.ARRAY,
//                   description: "Results from fact-checking",
//                   items: {
//                     type: Type.OBJECT,
//                     properties: {
//                       claim: {
//                         type: Type.STRING,
//                         description: "Claim being checked",
//                       },
//                       verdict: {
//                         type: Type.STRING,
//                         description:
//                           "Fact-checking verdict (e.g., True, False, Mixed)",
//                       },
//                     },
//                     required: ["claim", "verdict"],
//                   },
//                 },
//               },
//               required: ["fact_check_results"],
//             },
//           },
//           required: ["source_credibility", "fact_checking"],
//         },
//         overall_assessment: {
//           type: Type.OBJECT,
//           description: "Overall evaluation of the article's credibility",
//           properties: {
//             credibility_score: {
//               type: Type.NUMBER,
//               description:
//                 "Overall credibility score (0 to 1, higher is more credible)",
//             },
//             summary: {
//               type: Type.STRING,
//               description: "Summary of the fake news analysis",
//             },
//             recommendation: {
//               type: Type.STRING,
//               description: "Recommendation on whether to trust the article",
//             },
//           },
//           required: ["credibility_score", "summary", "recommendation"],
//         },
//       },
//       required: [
//         "textual_linguistic_analysis",
//         "source_contextual_analysis",
//         "overall_assessment",
//       ],
//     },
//   },
//   required: ["fake_news_report"],
// };

// // Chatbot response schema
// const chatbotResponseSchema = {
//   description: "Response from the fake news detection chatbot",
//   type: Type.OBJECT,
//   properties: {
//     response_type: {
//       type: Type.STRING,
//       description: "Type of response: 'analysis' or 'text'",
//       enum: ["analysis", "text"],
//     },
//     text_response: {
//       type: Type.STRING,
//       description:
//         "Conversational response, either a standalone reply or a summary accompanying the analysis",
//     },
//     fake_news_report: {
//       type: Type.OBJECT,
//       description: "Detailed fake news detection report (if applicable)",
//       nullable: true,
//       properties: fakeNewsReportSchema.properties.fake_news_report.properties,
//       required: fakeNewsReportSchema.properties.fake_news_report.required,
//     },
//   },
//   required: ["response_type", "text_response"],
// };


// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { message } = body;
//     console.log("Request Recived");

//     if (!message) {
//       console.log("NO Message ");
//       return new Response(
//         JSON.stringify({
//           response_type: "text",
//           text_response:
//             "Hello! I'm Newsify-AI. Paste a news article to analyze or just chat with me.",
//           fake_news_report: null,
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     // Construct prompt to enforce schema and handle input
//     const prompt = `
//       User input: "${message}"
//       - If the input appears to be a news article (long text, >200 characters, or starts with "/analyze"), generate a simplified fake news detection report based on the provided schema and include a conversational text summary (e.g., "This article seems unreliable due to...").
//       - If the input is a general question, greeting, or short message, respond with a conversational text reply only.
//       - Return the response in JSON format according to the provided schema, setting "response_type" to "analysis" or "text". Ensure "text_response" is always populated.
//     `;

//     // Send message to the AI model
//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: `
//     You are Newsify-AI, a fake news detection chatbot. Your role is to:
//     - Analyze news articles provided by users and generate a structured fake news detection report with a conversational summary.
//     - Respond conversationally to non-news inputs (e.g., greetings, questions) with helpful text replies.
//     - Always return responses in JSON format according to the provided schema, with "response_type" set to "analysis" for news or "text" for conversational replies. Include a "text_response" in all cases, summarizing the analysis for news inputs or providing a standalone reply for others ${prompt}`,

//       config: {
//         responseMimeType: "application/json",
//         responseSchema: fakeNewsReportSchema,
//       },
//     });

//     // Parse and return the AI's response
//     const parsedResponse = JSON.parse(response.text);


//     return new Response(JSON.stringify(parsedResponse), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.log("Error:", error);
//     return new Response(
//       JSON.stringify({
//         response_type: "text",
//         text_response: "Sorry, I encountered an error. Please try again.",
//         fake_news_report: null,
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }


import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API
const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

// Simplified fake news report schema (using string types for compatibility)
const fakeNewsReportSchema = {
  description: "Simplified fake news detection report",
  type: "object",
  properties: {
    fake_news_report: {
      type: "object",
      properties: {
        textual_linguistic_analysis: {
          type: "object",
          description: "Analysis of textual and linguistic features",
          properties: {
            sentiment_analysis: {
              type: "object",
              description: "Analysis of tone and emotional impact",
              properties: {
                tone: {
                  type: "string",
                  description: "Primary tone (e.g., neutral, sensational, negative)",
                },
                emotional_score: {
                  type: "number",
                  description: "Emotional intensity (0 to 1, higher is more emotional)",
                },
              },
              required: ["tone", "emotional_score"],
            },
            readability_score: {
              type: "number",
              description: "Flesch-Kincaid readability score (higher is easier to read)",
            },
          },
          required: ["sentiment_analysis", "readability_score"],
        },
        source_contextual_analysis: {
          type: "object",
          description: "Analysis of source credibility and fact-checking",
          properties: {
            source_credibility: {
              type: "object",
              description: "Evaluation of the publisher's reputation",
              properties: {
                publisher: {
                  type: "string",
                  description: "Name of the publisher or news outlet",
                },
                reputation_score: {
                  type: "string",
                  description: "Reputation assessment (e.g., Reputable, Questionable, Satire)",
                },
              },
              required: ["publisher", "reputation_score"],
            },
            fact_checking: {
              type: "object",
              description: "Fact-checking results",
              properties: {
                fact_check_results: {
                  type: "array",
                  description: "Results from fact-checking",
                  items: {
                    type: "object",
                    properties: {
                      claim: {
                        type: "string",
                        description: "Claim being checked",
                      },
                      verdict: {
                        type: "string",
                        description: "Fact-checking verdict (e.g., True, False, Mixed)",
                      },
                    },
                    required: ["claim", "verdict"],
                  },
                },
              },
              required: ["fact_check_results"],
            },
          },
          required: ["source_credibility", "fact_checking"],
        },
        overall_assessment: {
          type: "object",
          description: "Overall evaluation of the article's credibility",
          properties: {
            credibility_score: {
              type: "number",
              description: "Overall credibility score (0 to 1, higher is more credible)",
            },
            summary: {
              type: "string",
              description: "Summary of the fake news analysis",
            },
            recommendation: {
              type: "string",
              description: "Recommendation on whether to trust the article",
            },
          },
          required: ["credibility_score", "summary", "recommendation"],
        },
      },
      required: ["textual_linguistic_analysis", "source_contextual_analysis", "overall_assessment"],
    },
  },
  required: ["fake_news_report"],
};

// Chatbot response schema
const chatbotResponseSchema = {
  description: "Response from the fake news detection chatbot",
  type: "object",
  properties: {
    response_type: {
      type: "string",
      description: "Type of response: 'analysis' or 'text'",
      enum: ["analysis", "text"],
    },
    text_response: {
      type: "string",
      description: "Conversational response, either a standalone reply or a summary accompanying the analysis",
    },
    fake_news_report: {
      type: ["object", "null"],
      description: "Detailed fake news detection report (if applicable)",
      properties: fakeNewsReportSchema.properties.fake_news_report.properties,
      required: fakeNewsReportSchema.properties.fake_news_report.required,
    },
  },
  required: ["response_type", "text_response"],
};

// System instruction
const systemInstruction = `
You are Newsify-AI, a fake news detection chatbot. Your role is to:
- Analyze news articles provided by users and generate a structured fake news detection report with a conversational summary.
- Respond conversationally to non-news inputs (e.g., greetings, questions) with helpful text replies.
- Always return responses in JSON format according to the provided schema, with "response_type" set to "analysis" for news or "text" for conversational replies. Include a "text_response" in all cases, summarizing the analysis for news inputs or providing a standalone reply for others.
`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history = "" } = body; // History is a string of previous conversation
    console.log("Request Received");

    if (!message) {
      console.log("No Message");
      return new Response(
        JSON.stringify({
          response: {
            response_type: "text",
            text_response: "Hello! I'm Newsify-AI. Paste a news article to analyze or just chat with me.",
            fake_news_report: null,
          },
          updated_history: history,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Construct prompt with history (no explicit detection in code; model handles based on prompt/content)
    const prompt = `
${systemInstruction}
${history ? history + "\n" : ""}
User: ${message}
Assistant:
    `;

    // Send to the AI model using generateContent
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: chatbotResponseSchema,
      },
    });

    // Parse the AI's response
    const parsedResponse = JSON.parse(response.text);

    // Update history
    const updatedHistory = `
${history ? history + "\n" : ""}
User: ${message}
Assistant: ${response.text}
    `.trim();

    return new Response(
      JSON.stringify({
        response: parsedResponse,
        updated_history: updatedHistory,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error:", error);
    return new Response(
      JSON.stringify({
        response: {
          response_type: "text",
          text_response: "Sorry, I encountered an error. Please try again.",
          fake_news_report: null,
        },
        updated_history: "",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}