import { requirePage } from '@/lib/portal/guard';
import { PeerCollaborationHub } from '@/components/peer-review/PeerCollaborationHub';

export default async function PeerReviewPage() {
  await requirePage('peer-review:read');

  return <PeerCollaborationHub />;
}
