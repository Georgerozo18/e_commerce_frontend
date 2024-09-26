import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { check_user_session } from './redux/thunks/login/login_thunk'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { Navbar } from './pages/'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Al cargar la aplicación, verifica si el usuario tiene una sesión activa
    dispatch(check_user_session())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter>
      </AppRouter>
    </BrowserRouter>
  )
}