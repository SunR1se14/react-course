import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './reducers/favorites.slice'
import { gamesApi } from '../services/GamesService'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(gamesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
