import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import HashLoader from 'react-spinners/HashLoader.js'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function ChatBot() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchDataFromGeminiProAPI() {
    try {
      // ONLY TEXT
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = result.response.text();
      setLoading(false);
      setConversation([...conversation, { user: inputText, bot: text }]);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>ChatBot | NMK</title>
      <meta name="description" content="ChatBot" />
    </Helmet>
    </HelmetProvider>
      <h1 className="text-center font-bold text-3xl">Chat Bot</h1>
      <div className="chatbot__card">
        <div>
          {conversation.map((entry, index) => (
            <div key={index}>
              <div>You: {entry.user}</div>
              <div>Bot: {entry.bot}</div>
            </div>
          ))}
        </div>
        <div className="chatbot__input w-full">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="mx-auto" disabled={loading} onClick={() => fetchDataFromGeminiProAPI()}>
            {loading ? <HashLoader size={25} color='#fff' /> : 'Send'}
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
