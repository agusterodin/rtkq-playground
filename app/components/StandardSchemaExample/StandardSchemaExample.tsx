import { useGetPokemonQuery } from '@/state/pokemonApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return Boolean((error as FetchBaseQueryError)?.status)
}

export default function StandardSchemaExample() {
  const { data: pokemon, error } = useGetPokemonQuery('ditto')

  if (error && isFetchBaseQueryError(error) && error.status === 404) {
    return <div>Server responded saying pokemon doesn't exist.</div>
  } 
  else if (error && isFetchBaseQueryError(error) && error.status === 'TIMEOUT_ERROR') {
    return <div>Connection to server timed out.</div>
  } 
  else if (error && isFetchBaseQueryError(error) && error.status === 'SCHEMA_ERROR') {
    return <div>Response from server wasn't in expected format.</div>
  }

  return <div>{JSON.stringify(pokemon)}</div>
}
