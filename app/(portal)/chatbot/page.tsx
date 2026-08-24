import { requirePage } from '@/lib/portal/guard';
import { ChatbotClient } from '@/components/portal/ChatbotClient';

export default async function ChatbotPage() {
  await requirePage('chatbot:use');
  return <ChatbotClient />;
}
