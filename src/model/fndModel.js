import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API
const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY }); // Ensure API key is set in environment variables

// Define the schema for fake news detection report
const fakeNewsReportSchema = {
  description: "Detailed fake news detection report based on textual, linguistic, source, and contextual analysis",
  type: Type.OBJECT,
  properties: {
    fake_news_report: {
      type: Type.OBJECT,
      properties: {
        textual_linguistic_analysis: {
          type: Type.OBJECT,
          description: "Analysis of textual and linguistic features of the news article",
          properties: {
            sentiment_analysis: {
              type: Type.OBJECT,
              description: "Analysis of the article's tone and emotional impact",
              properties: {
                tone: {
                  type: Type.STRING,
                  description: "Primary tone of the article (e.g., neutral, sensational, negative)",
                },
                emotional_score: {
                  type: Type.NUMBER,
                  description: "Score indicating emotional intensity (0 to 1, higher is more emotional)",
                },
                emotional_indicators: {
                  type: Type.ARRAY,
                  description: "Words or phrases contributing to emotional tone",
                  items: { type: Type.STRING },
                },
                assessment: {
                  type: Type.STRING,
                  description: "Summary of how the tone impacts credibility",
                },
              },
              required: ["tone", "emotional_score", "emotional_indicators", "assessment"],
            },
            writing_style_readability: {
              type: Type.OBJECT,
              description: "Analysis of vocabulary, grammar, and readability",
              properties: {
                vocabulary_complexity: {
                  type: Type.STRING,
                  description: "Assessment of vocabulary complexity (e.g., simple, complex)",
                },
                grammar_spelling: {
                  type: Type.OBJECT,
                  description: "Evaluation of grammar and spelling errors",
                  properties: {
                    error_count: {
                      type: Type.NUMBER,
                      description: "Number of detected grammar/spelling errors",
                    },
                    error_examples: {
                      type: Type.ARRAY,
                      description: "Examples of errors found",
                      items: { type: Type.STRING },
                    },
                  },
                  required: ["error_count", "error_examples"],
                },
                tone_analysis: {
                  type: Type.STRING,
                  description: "Assessment of tone (e.g., inflammatory, conspiratorial, biased)",
                },
                readability_score: {
                  type: Type.NUMBER,
                  description: "Flesch-Kincaid readability score (higher is easier to read)",
                },
              },
              required: ["vocabulary_complexity", "grammar_spelling", "tone_analysis", "readability_score"],
            },
            named_entity_recognition: {
              type: Type.OBJECT,
              description: "Analysis of named entities and their verification",
              properties: {
                entities: {
                  type: Type.ARRAY,
                  description: "List of detected entities (people, organizations, locations)",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      entity: {
                        type: Type.STRING,
                        description: "Name of the entity",
                      },
                      type: {
                        type: Type.STRING,
                        description: "Type of entity (e.g., Person, Organization, Location)",
                      },
                      verification_status: {
                        type: Type.STRING,
                        description: "Verification result (e.g., Verified, Unverified, False)",
                      },
                      verification_details: {
                        type: Type.STRING,
                        description: "Details on verification process or source",
                      },
                    },
                    required: ["entity", "type", "verification_status", "verification_details"],
                  },
                },
              },
              required: ["entities"],
            },
            semantic_consistency: {
              type: Type.OBJECT,
              description: "Analysis of narrative consistency within the article",
              properties: {
                is_consistent: {
                  type: Type.BOOLEAN,
                  description: "Whether the article maintains a consistent narrative",
                },
                contradictions: {
                  type: Type.ARRAY,
                  description: "List of detected contradictions or inconsistencies",
                  items: { type: Type.STRING },
                },
                assessment: {
                  type: Type.STRING,
                  description: "Summary of consistency analysis",
                },
              },
              required: ["is_consistent", "contradictions", "assessment"],
            },
            clickbait_detection: {
              type: Type.OBJECT,
              description: "Analysis of headline for clickbait characteristics",
              properties: {
                is_clickbait: {
                  type: Type.BOOLEAN,
                  description: "Whether the headline is considered clickbait",
                },
                clickbait_indicators: {
                  type: Type.ARRAY,
                  description: "Phrases or patterns indicating clickbait",
                  items: { type: Type.STRING },
                },
                assessment: {
                  type: Type.STRING,
                  description: "Summary of clickbait analysis",
                },
              },
              required: ["is_clickbait", "clickbait_indicators", "assessment"],
            },
            source_citation_analysis: {
              type: Type.OBJECT,
              description: "Analysis of cited sources in the article",
              properties: {
                sources_cited: {
                  type: Type.ARRAY,
                  description: "List of cited sources and their credibility",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      source: {
                        type: Type.STRING,
                        description: "Name or URL of the cited source",
                      },
                      credibility: {
                        type: Type.STRING,
                        description: "Credibility assessment (e.g., High, Low, Unknown)",
                      },
                      context_usage: {
                        type: Type.STRING,
                        description: "Whether the source is used correctly or out of context",
                      },
                    },
                    required: ["source", "credibility", "context_usage"],
                  },
                },
                assessment: {
                  type: Type.STRING,
                  description: "Summary of source citation analysis",
                },
              },
              required: ["sources_cited", "assessment"],
            },
          },
          required: [
            "sentiment_analysis",
            "writing_style_readability",
            "named_entity_recognition",
            "semantic_consistency",
            "clickbait_detection",
            "source_citation_analysis",
          ],
        },
        source_contextual_analysis: {
          type: Type.OBJECT,
          description: "Analysis of source credibility and contextual verification",
          properties: {
            source_credibility: {
              type: Type.OBJECT,
              description: "Evaluation of the publisher's reputation",
              properties: {
                publisher: {
                  type: Type.STRING,
                  description: "Name of the publisher or news outlet",
                },
                reputation_score: {
                  type: Type.STRING,
                  description: "Reputation assessment (e.g., Reputable, Questionable, Satire)",
                },
                known_issues: {
                  type: Type.ARRAY,
                  description: "Known issues with the publisher (e.g., bias, fake news history)",
                  items: { type: Type.STRING },
                },
              },
              required: ["publisher", "reputation_score", "known_issues"],
            },
            author_credibility: {
              type: Type.OBJECT,
              description: "Evaluation of the author's credibility",
              properties: {
                author_name: {
                  type: Type.STRING,
                  description: "Name of the author (or Anonymous if not provided)",
                },
                is_verified: {
                  type: Type.BOOLEAN,
                  description: "Whether the author is a verified real person",
                },
                author_history: {
                  type: Type.STRING,
                  description: "Summary of the author's writing history or expertise",
                },
              },
              required: ["author_name", "is_verified", "author_history"],
            },
            cross_referencing: {
              type: Type.OBJECT,
              description: "Cross-referencing with other sources",
              properties: {
                matching_sources: {
                  type: Type.ARRAY,
                  description: "Reputable sources reporting similar information",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      source: {
                        type: Type.STRING,
                        description: "Name or URL of the matching source",
                      },
                      consistency: {
                        type: Type.STRING,
                        description: "Degree of consistency with the article",
                      },
                    },
                    required: ["source", "consistency"],
                  },
                },
                assessment: {
                  type: Type.STRING,
                  description: "Summary of cross-referencing results",
                },
              },
              required: ["matching_sources", "assessment"],
            },
            fact_checking: {
              type: Type.OBJECT,
              description: "Fact-checking against established sources",
              properties: {
                fact_check_results: {
                  type: Type.ARRAY,
                  description: "Results from fact-checking websites",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      fact_check_site: {
                        type: Type.STRING,
                        description: "Name of the fact-checking website",
                      },
                      claim: {
                        type: Type.STRING,
                        description: "Claim being checked",
                      },
                      verdict: {
                        type: Type.STRING,
                        description: "Fact-checking verdict (e.g., True, False, Mixed)",
                      },
                      details: {
                        type: Type.STRING,
                        description: "Details of the fact-checking process",
                      },
                    },
                    required: ["fact_check_site", "claim", "verdict", "details"],
                  },
                },
                disinformation_campaign: {
                  type: Type.OBJECT,
                  description: "Analysis for known disinformation campaigns",
                  properties: {
                    is_linked: {
                      type: Type.BOOLEAN,
                      description: "Whether the article is part of a known disinformation campaign",
                    },
                    campaign_details: {
                      type: Type.STRING,
                      description: "Details of the identified campaign, if any",
                    },
                  },
                  required: ["is_linked", "campaign_details"],
                },
              },
              required: ["fact_check_results", "disinformation_campaign"],
            },
          },
          required: ["source_credibility", "author_credibility", "cross_referencing", "fact_checking"],
        },
        overall_assessment: {
          type: Type.OBJECT,
          description: "Overall evaluation of the article's credibility",
          properties: {
            credibility_score: {
              type: Type.NUMBER,
              description: "Overall credibility score (0 to 1, higher is more credible)",
            },
            summary: {
              type: Type.STRING,
              description: "Summary of the fake news analysis",
            },
            recommendation: {
              type: Type.STRING,
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

// Function to generate fake news detection report
async function generateFakeNewsReport(newsData) {
  const inputData = JSON.stringify(newsData);

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${inputData} Analyze the provided news article based on the given schema, evaluating textual, linguistic, source, and contextual parameters to determine its credibility and generate a detailed fake news detection report.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: fakeNewsReportSchema,
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating fake news report:", error);
    throw error;
  }
}

export { generateFakeNewsReport };