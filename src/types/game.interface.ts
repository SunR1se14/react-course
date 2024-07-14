export interface IGame {
  id: number
  name: string
  background_image: string
  rating: number
  slug: string
  released: string
  platforms: [
    {
      platform: {
        name: string
      }
    },
  ]
  developers: [
    {
      name: string
    },
  ]
  genres: [
    {
      name: string
    },
  ]
}
