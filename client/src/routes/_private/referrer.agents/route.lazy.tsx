import { ReferrerAgentPage } from '@/pages/referrer/agent/referrer-agent.page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_private/referrer/agents')({
  component: ReferrerAgentPage,
});
