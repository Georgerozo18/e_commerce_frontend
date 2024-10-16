import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { check_user_session } from './redux/thunks/login_thunk'
import { AppRouter } from './router'
import { Navbar } from './pages/'
import { fetch_products_thunk } from './redux/thunks/product_thunk'

export const App = () => {
  const dispatch = useDispatch()
  const { products, is_loading } = useSelector((state) => state.product_slice)

  // useEffect para verificar la sesión del usuario
  useEffect(() => {
    dispatch(check_user_session())
  }, [dispatch])

  // useEffect para cargar productos
  useEffect(() => {
    if (!is_loading && products.length === 0) {
      dispatch(fetch_products_thunk())
    }
  }, [dispatch, products.length, is_loading])

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  )
}