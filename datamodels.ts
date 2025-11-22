import { z } from 'zod'

export const CampaignStatus = z.enum(['ACTIVE', 'PENDING', 'PAUSED', 'ERROR', 'SUBMITTING', 'DRAFT'])
export type CampaignStatus = z.infer<typeof CampaignStatus>

export const CampaignMetadata = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean()
})
export type CampaignMetadata = z.infer<typeof CampaignMetadata>
