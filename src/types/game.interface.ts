export interface IGame {
  id: number
  name: string
  background_image: string
  rating: number
  genres: [
    {
      name: string
    },
  ]
}
