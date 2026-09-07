import { requirePage } from '@/lib/portal/guard';
import { AiChatbot } from '@/components/chatbot/AiChatbot';

export default async function ChatbotPage() {
  await requirePage('chatbot:use');

  return <AiChatbot />;
}
