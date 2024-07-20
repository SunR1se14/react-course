import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGame } from '../../types/game.interface'

const initialState: IGame[] = []

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<IGame>) => {
      const game = state.some(item => item.id === action.payload.id)
      if (game) {
        const index = state.findIndex(item => item.id === action.payload.id)
        state.splice(index, 1)
      } else {
        state.push(action.payload)
      }
    },
  },
})

export default favoritesSlice.reducer
export const favoritesActions = favoritesSlice.actions
