import { IGame } from './game.interface'

export interface IResponse {
  count: number
  next: string
  previous: string
  results: IGame[]
}
