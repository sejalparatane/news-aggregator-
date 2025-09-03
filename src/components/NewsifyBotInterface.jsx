// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Send, Bot, User, BotIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import AiResponse from "./AiResponse";
// import { Button } from "./ui/button";

// export default function ChatInterface() {
//   const [messages, setMessages] = useState([
//     { content: "Hi! I am Newsify AI, how can I help you?", role: "assistant", timestamp: Date.now(), id: 845938 },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const textareaRef = useRef(null);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleTextareaChange = (e) => {
//     setInput(e.target.value);
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
//       textareaRef.current.style.height = `${newHeight}px`;
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const sendMessageToAPI = async (message) => {
//     try {
//       const response = await fetch("/api/chatbot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error("API request failed");
//       }

//       const data = await response.json();
//       return data.response;
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       content: input.trim(),
//       role: "user",
//       timestamp: Date.now(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);
//     setIsTyping(true);

//     try {
//       const aiResponse = await sendMessageToAPI(input.trim());

//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponse,
//         role: "assistant",
//         timestamp: Date.now(),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage = {
//         id: (Date.now() + 1).toString(),
//         content: "Sorry, there was an error processing your request. Please try again.",
//         role: "assistant",
//         timestamp: Date.now(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//       setIsTyping(false);
//       if (textareaRef.current) {
//         textareaRef.current.style.height = "48px";
//       }
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     return new Intl.DateTimeFormat("en-US", {
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     }).format(new Date(timestamp));
//   };

//   return (
//     <div className="flex flex-col h-[90vh] rounded-xl bg-background shadow-xl">
//       <div className="flex items-center justify-between p-4">
//         <h2 className="text-xl font-semibold text-theme-purple">
//           Newsify AI
//         </h2>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={cn(
//               "flex items-start gap-3 max-w-[80%]",
//               message.role === "assistant" ? "mr-auto" : "ml-auto flex-row-reverse"
//             )}
//           >
//             <div
//               className={cn(
//                 "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md",
//                 message.role === "assistant" ? "bg-theme-purple ring-2 ring-theme-purple/20" : "bg-theme-purple ring-2 ring-theme-purple/20"
//               )}
//             >
//               {message.role === "assistant" ? (
//                 <Bot size={18} className="text-white" />
//               ) : (
//                 <User size={18} className="text-white" />
//               )}
//             </div>
//             <div>
//               <div
//                 className={cn(
//                   "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
//                   message.role === "assistant"
//                     ? "bg-muted/50 hover:bg-muted/80 transition-colors"
//                     : "bg-theme-purple text-white"
//                 )}
//               >
//                 <AiResponse>{message.content}</AiResponse>
//               </div>
//               <div className="mt-1 text-xs text-muted-foreground">
//                 {formatTimestamp(message.timestamp)}
//               </div>
//             </div>
//           </div>
//         ))}
//         {isTyping && (
//           <div className="flex items-center gap-2 max-w-[80%]">
//             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-theme-purple">
//               <BotIcon size={18} className="text-white" />
//             </div>
//             <div className="flex space-x-2 rounded-2xl bg-muted/50 px-4 py-2.5 text-sm">
//               <div className="typing-dot"></div>
//               <div className="typing-dot"></div>
//               <div className="typing-dot"></div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-4 bg-theme-purple/5"
//       >
//         <div className="flex gap-2 items-end relative">
//           <textarea
//             ref={textareaRef}
//             value={input}
//             onChange={handleTextareaChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message... (Shift + Enter for new line)"
//             disabled={isLoading}
//             className="text-black flex-1 rounded-xl outline-none border-none min-h-[48px] max-h-[200px] overflow-y-auto resize-none py-3 px-4 leading-tight"
//             style={{
//               height: "48px",
//             }}
//           />
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className={cn(
//               "rounded-xl bg-theme-purple text-white shadow-md hover:shadow-lg transition-shadow h-12 px-4",
//               isLoading && "cursor-not-allowed"
//             )}
//           >
//             <Send size={18} />
//           </Button>
//         </div>
//         <div className="mt-1 text-xs text-muted-foreground text-center">
//           Press Enter to send, Shift + Enter for new line
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, FileText, Globe, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { content: "Hi! I am Newsify AI, how can I help you?", role: "assistant", timestamp: Date.now(), id: 845938 },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const aiResponse = await sendMessageToAPI(input.trim());

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, there was an error processing your request. Please try again.",
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  const renderAssistantMessage = (content) => {
    if (typeof content === "string") {
      // Handle plain text or error messages
      return <p>{content}</p>;
    }

    const { response_type, text_response, fake_news_report } = content;

    if (response_type === "text") {
      return <p>{text_response}</p>;
    }

    if (response_type === "analysis" && fake_news_report) {
      const { textual_linguistic_analysis, source_contextual_analysis, overall_assessment } = fake_news_report;
      const credibilityScore = Math.round(overall_assessment.credibility_score * 100);

      return (
        <div className="space-y-4">
          <p className="font-semibold text-theme-purple">{text_response}</p>
          <Card className="border-theme-purple/20 shadow-md">
            <CardHeader className="bg-theme-purple/10">
              <CardTitle className="text-lg flex items-center gap-2 text-theme-purple">
                <AlertCircle size={20} />
                Overall Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 ">
                <span className="font-medium">Credibility Score:</span>
                <Badge className={`bg-theme-purple`} variant={credibilityScore > 70 ? "success" : credibilityScore > 40 ? "warning" : "destructive"}>
                  {credibilityScore}%
                </Badge>
              </div>
              <Progress value={credibilityScore} className="h-2" />
              <p><span className="font-medium">Summary:</span> {overall_assessment.summary}</p>
              <p><span className="font-medium">Recommendation:</span> {overall_assessment.recommendation}</p>
            </CardContent>
          </Card>
          <Accordion type="single" collapsible className="border rounded-lg border-theme-purple/20">
            <AccordionItem value="textual">
              <AccordionTrigger className="hover:bg-theme-purple/5">
                <div className="flex items-center gap-2 text-theme-purple">
                  <FileText size={18} />
                  Textual & Linguistic Analysis
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-2">
                <div>
                  <span className="font-medium">Tone:</span> {textual_linguistic_analysis.sentiment_analysis.tone}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Emotional Score:</span>
                  <Badge variant="outline">{textual_linguistic_analysis.sentiment_analysis.emotional_score}</Badge>
                </div>
                <div>
                  <span className="font-medium">Readability Score:</span> {textual_linguistic_analysis.readability_score}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="source">
              <AccordionTrigger className="hover:bg-theme-purple/5">
                <div className="flex items-center gap-2 text-theme-purple">
                  <Globe size={18} />
                  Source & Contextual Analysis
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-2">
                <div>
                  <span className="font-medium">Publisher:</span> {source_contextual_analysis.source_credibility.publisher}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Reputation:</span>
                  <Badge variant="outline">{source_contextual_analysis.source_credibility.reputation_score}</Badge>
                </div>
                <div>
                  <span className="font-medium">Fact Check Results:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    {source_contextual_analysis.fact_checking.fact_check_results.map((result, index) => (
                      <li key={index}>
                        <span className="font-medium">{result.claim}:</span> {result.verdict}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="overall">
              <AccordionTrigger className="hover:bg-theme-purple/5">
                <div className="flex items-center gap-2 text-theme-purple">
                  <CheckCircle size={18} />
                  Detailed Overall Assessment
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-2">
                <p>{overall_assessment.summary}</p>
                <p className="font-medium">{overall_assessment.recommendation}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );
    }

    return <p>Invalid response format.</p>;
  };

  return (
    <div className="flex flex-col h-[90vh] rounded-xl bg-background shadow-xl">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-theme-purple">
          Newsify AI
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 max-w-[80%]",
              message.role === "assistant" ? "mr-auto" : "ml-auto flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md",
                message.role === "assistant" ? "bg-theme-purple ring-2 ring-theme-purple/20" : "bg-theme-purple ring-2 ring-theme-purple/20"
              )}
            >
              {message.role === "assistant" ? (
                <Bot size={18} className="text-white" />
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
            <div className="w-full">
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                  message.role === "assistant"
                    ? "bg-muted/50 hover:bg-muted/80 transition-colors"
                    : "bg-theme-purple text-white"
                )}
              >
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  renderAssistantMessage(message.content)
                )}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 max-w-[80%]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-theme-purple">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex space-x-2 rounded-2xl bg-muted/50 px-4 py-2.5 text-sm">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-theme-purple/5"
      >
        <div className="flex gap-2 items-end relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift + Enter for new line)"
            disabled={isLoading}
            className="text-black flex-1 rounded-xl outline-none border-none min-h-[48px] max-h-[200px] overflow-y-auto resize-none py-3 px-4 leading-tight"
            style={{
              height: "48px",
            }}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "rounded-xl bg-theme-purple text-white shadow-md hover:shadow-lg transition-shadow h-12 px-4",
              isLoading && "cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </Button>
        </div>
        <div className="mt-1 text-xs text-muted-foreground text-center">
          Press Enter to send, Shift + Enter for new line
        </div>
      </form>
    </div>
  );
}