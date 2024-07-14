import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import GameDetails from '../components/GameDetails/GameDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'details/:slug',
        element: <GameDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
