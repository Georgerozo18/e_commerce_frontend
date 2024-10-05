import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { check_user_session } from './redux/thunks/login_thunk'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { Navbar } from './pages/'
import { fetch_products_thunk } from './redux/thunks/product_thunk'

export const App = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.product_slice)

  useEffect(() => {
    // Al cargar la aplicación, verifica si el usuario tiene una sesión activa
    dispatch(check_user_session())
  }, [dispatch])

  useEffect(() => {
    // Cargar productos si no están ya en el store
    if (products.length === 0) {
      dispatch(fetch_products_thunk())
    }
  }, [dispatch, products])

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter>
      </AppRouter>
    </BrowserRouter>
  )
}