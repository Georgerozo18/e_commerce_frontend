import { useSelector } from 'react-redux'
import { AdminRouter, UserRouter } from './'
import { SecretSequence } from '../components/SecretSequence'


export const AppRouter = () => {
    const { user } = useSelector(state => state.login_slice)
    const secretSequence = import.meta.env.VITE_SECRET_SEQUENCE.split('')

    // Mostrar rutas dependiendo del rol del usuario, incluyendo el SecretSequence
    return (
        <>
            <SecretSequence sequence={secretSequence} />
            {user?.role === 'admin' ? <AdminRouter /> : <UserRouter />}
        </>
    )
}