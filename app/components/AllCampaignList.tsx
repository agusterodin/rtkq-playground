import React from 'react'
import { useGetAllCampaignMetadataQuery } from '@/state/campaign'
import ActiveToggle from './ActiveToggle'

export default function NoteItem() {
  const { data } = useGetAllCampaignMetadataQuery(undefined, {
    // pollingInterval: 500
    // refetchOnFocus: true
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      {data.slice(0, 3).map(campaign => (
        <div key={campaign.id} className="px-2 pr-0 bg-gray-200 py-2 w-fit flex items-center gap-4">
          {campaign.name} <ActiveToggle {...campaign} />
        </div>
      ))}
    </div>
  )
}
