import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000'
})

export const campaignsApi = createApi({
  reducerPath: 'campaignsApi',
  baseQuery,
  tagTypes: ['campaign'],
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: false
})
