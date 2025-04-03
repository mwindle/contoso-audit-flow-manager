
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;
  
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full shadow-lg z-50"
      size="icon"
      onClick={onClick}
      aria-label="Open chat"
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
};

export default ChatButton;
