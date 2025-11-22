import { z } from 'zod'
import { CampaignMetadata } from 'datamodels'
import { campaignsApi } from './index'

export const noArgs = z.void()
export const messageResponse = z.object({ message: z.string() })

// Slices

const campaignApiSlice = campaignsApi.injectEndpoints({
  endpoints: builder => ({
    getAllCampaignMetadata: builder.query({
      argSchema: noArgs,
      responseSchema: z.array(CampaignMetadata),
      query: () => 'campaign',
      providesTags: ['campaign'],
      keepUnusedDataFor: Infinity
    }),
    setCampaignActive: builder.mutation({
      argSchema: z.object({ id: z.number(), active: z.boolean() }),
      responseSchema: messageResponse,
      query: ({ id, active }) => ({
        url: `campaign/activate/${id}`,
        method: 'PUT',
        body: { active }
      }),
      invalidatesTags: ['campaign'],
      async onQueryStarted({ id, active }, { dispatch, queryFulfilled }) {
        const getAllPatchResult = dispatch(
          campaignApiSlice.util.updateQueryData('getAllCampaignMetadata', undefined, draft => {
            const campaign = draft.find(campaign => campaign.id === id)
            if (campaign) campaign.active = active
          })
        )
        try {
          await queryFulfilled
        } catch {
          getAllPatchResult.undo()
        }
      }
    })
  }),
  overrideExisting: true
})

export const { useGetAllCampaignMetadataQuery, useSetCampaignActiveMutation } = campaignApiSlice
