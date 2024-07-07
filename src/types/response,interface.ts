import { IGame } from './game.interface'

export interface IResponse {
  next: string
  previous: string
  results: IGame[]
}
