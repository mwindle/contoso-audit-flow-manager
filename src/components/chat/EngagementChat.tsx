
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X } from 'lucide-react';
import { ChatAuthProvider } from '@/lib/ChatAuthProvider';
import { ChatEmbedded, ChatEmbeddedAPI, ChatLaunchConfig } from '@microsoft/sharepointembedded-copilotchat-react';
import { ChatController } from '@/lib/ChatController';

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
  const [chatAuthProvider, setChatAuthProvider] = React.useState<ChatAuthProvider | undefined>(undefined);
  const [showChat, setShowChat] = React.useState(false);
  ChatAuthProvider.getInstance()
    .then(setChatAuthProvider)
    .then(() => setShowChat(true))
    .catch(console.error);

  const [chatConfig] = React.useState<ChatLaunchConfig>({
    header: "Contoso Audit Assistant",
    theme: ChatController.instance.theme,
    zeroQueryPrompts: ChatController.instance.getPrompts(),
    instruction: "You are a helpful assistant that auditors use to find and summarize information related to auditing cases. Make sure you include references to the documents data comes from when possible. ",
    locale: ChatController.instance.locale,
  });

  const onApiReady = async (api: ChatEmbeddedAPI) => {
    await api.openChat(chatConfig);
  }

  return (<>
    {showChat && (
      <ChatEmbedded
        authProvider={chatAuthProvider}
        onApiReady={onApiReady}
        containerId='b!wayo5B3pak-xCJ_xVor9G2_6POrJb1xHh4ThaV12p65FzY7inX-5R6ZaV25KrZli'
      />
    )}
  </>);
};

export default EngagementChat;
