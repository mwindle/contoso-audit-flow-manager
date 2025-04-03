
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
  avatar?: string;
}

interface EngagementChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const EngagementChat: React.FC<EngagementChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! Can you please upload the bank statements for Q3?',
      sender: 'John Auditor',
      timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      isCurrentUser: false,
      avatar: '/placeholder.svg',
    },
    {
      id: '2',
      content: 'I will get those to you by tomorrow.',
      sender: 'You',
      timestamp: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
      isCurrentUser: true,
    },
    {
      id: '3',
      content: 'Thanks! Also, have you completed the reconciliation task yet?',
      sender: 'John Auditor',
      timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
      isCurrentUser: false,
      avatar: '/placeholder.svg',
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: 'You',
      timestamp: new Date(),
      isCurrentUser: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col h-full border-l transition-all duration-300 bg-background ${isOpen ? 'w-80' : 'w-0 opacity-0 pointer-events-none'}`}>
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Engagement Chat</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[90%]`}>
                {!message.isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div 
                    className={`rounded-lg p-3 text-sm ${
                      message.isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    {!message.isCurrentUser && <span>{message.sender}</span>}
                    <span>•</span>
                    <span>{formatTimestamp(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-3">
        <form 
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input 
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EngagementChat;
