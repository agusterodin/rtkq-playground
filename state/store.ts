import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { pokemonApiSlice } from './pokemonApi'

const rootReducer = combineSlices({ [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer })

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(pokemonApiSlice.middleware)
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type State = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<State>()
