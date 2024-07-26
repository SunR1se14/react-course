import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, API_URL } from '../utils/constants'
import { IResponse } from '../types/response.interface'
import { IGame } from '../types/game.interface'

interface GetGamesArgs {
  pageSize: number
  page: number
  search: string
}

interface GetGameArgs {
  pageSize: number
  slug: string
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: build => ({
    getGames: build.query<IResponse, GetGamesArgs>({
      query: ({ pageSize, page, search }) => ({
        url: '/games',
        params: {
          ['page_size']: pageSize,
          page,
          search,
          key: API_KEY,
        },
      }),
    }),
    getGame: build.query<IGame, GetGameArgs>({
      query: ({ slug, pageSize }) => ({
        url: `/games/${slug}`,
        params: {
          ['page_size']: pageSize,
          key: API_KEY,
        },
      }),
    }),
  }),
})
