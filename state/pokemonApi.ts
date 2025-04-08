import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { z } from 'zod'

const pokemonSchema = z.object({
  // id: z.number(),
  height: z.number(),
  // weight: z.number()
})

console.log('pokemonSchema', pokemonSchema)

export const pokemonApiSlice = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'pokemonApi',
  onSchemaFailure: (error, info) => {
    console.error('error', info)
  },
  endpoints: builder => ({
    getPokemon: builder.query({
      argSchema: z.string(),
      responseSchema: pokemonSchema,
      query: name => {
        return {
          url: `https://pokeapi.co/api/v2/pokemon/${name}`
        }
      },
      errorResponseSchema: z.object({
        status: z.literal('CUSTOM_ERROR'),
        error: z.string(),
        data: z.object({
          chuck: z.string()
        })
      }),
      skipSchemaValidation: false
    })
  })
})

export const { useGetPokemonQuery } = pokemonApiSlice
