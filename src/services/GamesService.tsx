import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, API_URL } from '../utils/constants'
import { IResponse } from '../types/response.interface'
import { IGame } from '../types/game.interface'

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: build => ({
    getGames: build.query<
      IResponse,
      { pageSize: number; page: number; search: string }
    >({
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
    getGame: build.query<IGame, { pageSize: number; slug: string }>({
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
