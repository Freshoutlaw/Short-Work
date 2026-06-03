// useGroqChat.js
import { useState, useRef, useCallback } from 'react';
import { sendChatMessage } from '../lib/groqClient';

export const useGroqChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    const newUserMessage = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setError(null);

    try {
      const allMessages = [...messages, newUserMessage];
      const response = await sendChatMessage(allMessages);

      if (!response.reply) throw new Error('No response from server');

      const assistantMessage = { role: 'assistant', content: response.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message || 'Failed to send message');
      // Remove the user message if request failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    clearError,
    messagesEndRef,
  };
};
