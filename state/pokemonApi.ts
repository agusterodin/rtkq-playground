import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { z } from 'zod'

const Pokemon = z.object({
  id: z.number(),
  height: z.number()
})

const PokemonApiCustomError = z.object({
  errorCode: z.string(),
  shortErrorMessage: z.string(),
  verboseErrorMessage: z.string()
})

export const pokemonApiSlice = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'pokemonApi',
  onSchemaFailure: error => {
    // throw error
  },
  endpoints: builder => ({
    getPokemon: builder.query({
      responseSchema: Pokemon,
      query: (name: string) => {
        return {
          url: `https://pokeapi.co/api/v2/pokemon/${name}`
        }
      },
      // errorResponseSchema: PokemonApiCustomError
      errorResponseSchema: z.object({
        status: z.literal('CUSTOM_ERROR'),
        error: z.string(),
        data: PokemonApiCustomError
      })
    })
  })
})

export const { useGetPokemonQuery } = pokemonApiSlice
