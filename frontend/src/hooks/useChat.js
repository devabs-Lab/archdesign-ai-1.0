import { useState } from 'react';
import { ChatService } from '../services/api';
import { useAppContext } from '../context/AppContext';

export const useChat = () => {
    const { chats, setChats, currentChatId, setCurrentChatId, setActiveSection } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get active chat or create an empty one
    const activeChat = chats.find(c => c.id === currentChatId) || { messages: [] };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        setActiveSection("chat");
        setLoading(true);
        setError(null);

        // Ensure we have an active chat ID
        let targetChatId = currentChatId;
        if (!targetChatId) {
            targetChatId = Date.now().toString();
            setCurrentChatId(targetChatId);
            // Create new chat session internally
            setChats(prev => [{ id: targetChatId, title: text.substring(0, 30), messages: [] }, ...prev]);
        }

        // 1. Add user message
        const userMsg = { id: Date.now(), role: 'user', content: text };
        const previousMessages =
            chats.find(chat => chat.id === targetChatId)?.messages || [];

        setChats(prev => prev.map(chat => {
            if (chat.id === targetChatId) {
                return { ...chat, messages: [...chat.messages, userMsg] };
            }
            return chat;
        }));

        try {
            // 2. Fetch API
            const aiResponseText = await ChatService.submitDesignRequirement(
                text,
                previousMessages.map(({ role, content }) => ({ role, content }))
            );

            // 3. Add AI response
            const aiMsg = { id: Date.now() + 1, role: 'assistant', content: aiResponseText };
            setChats(prev => prev.map(chat => {
                if (chat.id === targetChatId) {
                    return { ...chat, messages: [...chat.messages, aiMsg] };
                }
                return chat;
            }));

        } catch (err) {
            setError(err.message || 'Error communicating with AI Crew.');
        } finally {
            setLoading(false);
        }
    };

    return {
        messages: activeChat.messages,
        sendMessage,
        loading,
        error
    };
};
