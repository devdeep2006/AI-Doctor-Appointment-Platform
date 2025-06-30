"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Activity, Stethoscope, AlertTriangle, Clock, CheckCircle, Loader, Plus } from 'lucide-react';

const DiseasePredictor = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Quick symptom suggestions
  const quickSymptoms = [
    "I have fever and headache",
    "I'm experiencing chest pain and shortness of breath",
    "I have persistent cough and fatigue",
    "I feel nauseous with abdominal pain",
    "I have joint pain and muscle aches",
    "I'm having dizziness and weakness"
  ];

  // Frequent individual symptoms
  const frequentSymptoms = [
    "fever", "headache", "cough", "fatigue", "nausea", "vomiting",
    "chest pain", "shortness of breath", "dizziness", "weakness",
    "joint pain", "muscle aches", "sore throat", "runny nose",
    "abdominal pain", "diarrhea", "constipation", "back pain",
    "skin rash", "loss of appetite", "weight loss", "night sweats",
    "chills", "blurred vision", "difficulty breathing", "palpitations"
  ];

  // Gemini API configuration
  // NOTE: In a real application, you'd load this securely, e.g., from environment variables.
  // For this Canvas environment, we'll leave it as an empty string and the system will provide it.
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  
  // API function to predict disease using Gemini
  const predictDisease = async (message) => {
    try {
      // Validate input for specificity
      if (message.split(',').length < 2 && !quickSymptoms.map(s => s.toLowerCase()).includes(message.toLowerCase())) {
        throw new Error('Please provide at least two specific symptoms or more details for a more accurate analysis.');
      }

      // Craft a precise, structured prompt for Gemini
      const prompt = `
        You are a specialized medical AI assistant focused on symptom analysis and disease prediction. Based on the provided symptoms, provide a concise and specific response **ONLY** in the following JSON format. Do not include any other text, explanations, or markdown outside of the JSON object itself.

        JSON Format:
        {
          "diagnosis": "Primary suspected condition (if applicable)",
          "probability": "Estimated likelihood (e.g., low, medium, high)",
          "details": "Brief explanation of why this condition is suspected, referencing specific symptoms",
          "advice": "Specific next steps or recommendations (e.g., tests, consultations)",
          "disclaimer": "This is not a substitute for professional medical advice. Consult a healthcare provider."
        }

        Constraints:
        - Only analyze the provided symptoms: "${message}".
        - Do not provide general health tips unrelated to the symptoms.
        - If symptoms are too vague or insufficient, return a JSON object with an "error" field like: {"error": "The symptoms provided are too vague. Please include more specific details (e.g., duration, severity)."}
        - Avoid speculative or overly broad diagnoses (e.g., "could be anything").
        - Use medical terminology but keep explanations clear for non-experts.
        - Always include the specified disclaimer.

        Example:
        Symptoms: "fever, cough, shortness of breath"
        Response: {
          "diagnosis": "Pneumonia",
          "probability": "Medium",
          "details": "Fever, cough, and shortness of breath suggest a respiratory infection like pneumonia, especially if symptoms are severe or persistent.",
          "advice": "Seek a chest X-ray and consult a pulmonologist promptly.",
          "disclaimer": "This is not a substitute for professional medical advice. Consult a healthcare provider."
        }
      `;

      // Construct the URL with the API key as a query parameter
      const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 500, // Ensure enough tokens for the full JSON
            temperature: 0.1,    // Lower temperature for more deterministic, structured output
            topK: 1,             // Focus on the most probable tokens
            topP: 0.1,           // Keep very high probability mass
          },
        }),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        console.error('Gemini API raw error response (not OK):', errorDetail);
        throw new Error(`Gemini API error! Status: ${response.status} - ${errorDetail}`);
      }

      const data = await response.json();
      
      let result;
      try {
        const geminiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!geminiResponseText) {
          console.error('Gemini API response did not contain expected text content in candidates[0].content.parts[0].text:', data);
          throw new Error('Gemini API returned an empty or malformed text response.');
        }

        // --- Robust JSON Extraction ---
        let cleanedJsonString = geminiResponseText;

        // 1. Try to find JSON within markdown code blocks (```json ... ```)
        let jsonMatch = geminiResponseText.match(/```json\n([\s\S]*?)\n```/);
        if (!jsonMatch) {
            jsonMatch = geminiResponseText.match(/```([\s\S]*?)```/); // Fallback for plain code block
        }
        if (jsonMatch && jsonMatch[1]) {
            cleanedJsonString = jsonMatch[1];
        } else {
            // 2. If no markdown, try to find the first '{' and last '}' to isolate JSON
            const firstBrace = geminiResponseText.indexOf('{');
            const lastBrace = geminiResponseText.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                cleanedJsonString = geminiResponseText.substring(firstBrace, lastBrace + 1);
            }
        }
        
        // 3. Trim whitespace and newlines from the extracted string
        cleanedJsonString = cleanedJsonString.trim();

        // 4. Attempt to parse the (hopefully) clean JSON string
        result = JSON.parse(cleanedJsonString);

      } catch (parseError) {
        console.error('JSON parsing error from Gemini response:', parseError);
        console.error('Raw Gemini data received (for debug):', JSON.stringify(data, null, 2));
        console.error('Attempted to parse text (for debug):', data.candidates?.[0]?.content?.parts?.[0]?.text);
        throw new Error('Invalid or unexpected response format from Gemini API. Failed to parse JSON. Please try again or refine your query.');
      }

      // Check for an 'error' field in the parsed JSON, as per your prompt's constraint
      if (result && result.error) {
        throw new Error(result.error); // Throw the specific error message from Gemini
      }

      // Validate response specificity after parsing, for cases where Gemini might return generic but parsable JSON
      // This is crucial to ensure meaningful output even if parsing succeeds.
      if (!result.diagnosis || result.diagnosis.toLowerCase().includes('unknown') || result.diagnosis.toLowerCase().includes('unclear') || result.diagnosis.toLowerCase().includes('insufficient data') || result.diagnosis.toLowerCase().includes('cannot determine')) {
        throw new Error('The symptoms provided are too vague for a precise diagnosis. Please include more specific details (e.g., duration, severity, other associated symptoms).');
      }

      return result;
    } catch (error) {
      console.error('Error in predictDisease function:', error);
      throw error; // Re-throw to be caught by handleSendMessage
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    const userMessage = message.trim();
    setMessage('');
    setError(null);
    setLoading(true);

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistory((prev) => [...prev, newUserMessage]);

    try {
      const result = await predictDisease(userMessage);

      // Format bot response for display
      const botMessageContent = `
Suspected Condition: ${result.diagnosis} (${result.probability} probability)
Details: ${result.details}
Advice: ${result.advice}
Disclaimer: ${result.disclaimer}
      `;

      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botMessageContent,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error('Prediction error caught in handleSendMessage:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSymptom = (symptom) => {
    setMessage(symptom);
  };

  const handleFrequentSymptom = (symptom) => {
    setMessage((prev) => (prev.trim() ? prev.trim() + ', ' + symptom : symptom));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 font-inter">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Stethoscope className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Symptom Analyser</h1>
                <p className="text-sm text-gray-600">Powered by NovaCare</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Symptoms */}
        {chatHistory.length === 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Start - Try these symptoms:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickSymptoms.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSymptom(symptom)}
                  className="p-3 text-left bg-white border border-amber-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 text-gray-700 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">{symptom}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Frequent Symptoms */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Frequent Symptoms - Click to add to your description:
          </h3>
          <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {frequentSymptoms.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => handleFrequentSymptom(symptom)}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 hover:text-amber-900 rounded-full text-sm transition-all duration-200 border border-amber-200 hover:border-amber-300 shadow-sm"
                >
                  <Plus className="h-3 w-3" />
                  <span>{symptom}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              💡 Tip: For best results, include at least two symptoms with details (e.g., duration, severity)
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg border border-amber-100 h-96 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-100">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-amber-500" />
              <span className="font-medium text-gray-700">NovaCare AI Assistant</span>
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={clearChat}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-amber-100 transition-colors"
              >
                Clear Chat
              </button>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-amber-200 mx-auto mb-3" />
                <p className="text-gray-500">Describe your symptoms to get started</p>
                <p className="text-sm text-gray-400 mt-1">Use the frequent symptoms above to build your description</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}>
                    {chat.type === 'bot' && (
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Bot className="h-4 w-4 text-amber-600" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg shadow-sm ${
                        chat.type === 'user'
                          ? 'bg-amber-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{chat.content}</p>
                      <p className={`text-xs mt-1 ${
                        chat.type === 'user' ? 'text-amber-100' : 'text-gray-500'
                      }`}>
                        {chat.timestamp}
                      </p>
                    </div>
                    {chat.type === 'user' && (
                      <div className="bg-amber-500 p-2 rounded-full">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Bot className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Loader className="h-4 w-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500">Analyzing your symptoms...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-amber-100 p-4">
            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 shadow-sm">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
            
            <div className="flex space-x-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms... (e.g., fever, headache, cough) or click symptoms above to add them"
                className="flex-1 resize-none border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700 shadow-sm"
                rows={2}
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
                className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • For best results, include at least two symptoms with details (e.g., duration, severity)
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1">Medical Disclaimer</h4>
              <p className="text-sm text-amber-700">
                This AI tool is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-gray-700">AI Powered</span>
            </div>
            <p className="text-sm text-gray-600">Advanced AI prediction for precise medical insights</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="font-semibold text-gray-700">Instant Results</span>
            </div>
            <p className="text-sm text-gray-600">Get predictions in seconds, not hours</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Stethoscope className="h-5 w-5 text-fuchsia-500" /> {/* Changed to fuchsia for a subtle contrast */}
              <span className="font-semibold text-gray-700">Symptom Analysis</span>
            </div>
            <p className="text-sm text-gray-600">Detailed symptom pattern recognition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePredictor;
