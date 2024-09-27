import { useSelector } from 'react-redux'
import { PageContainer } from '../components/PageContainer'

export const Profile = () => {
    const {
        user,
        is_authenticated,
        is_loading
    } = useSelector(state => state.login_slice)

    if (is_loading) return <p>Verificando sesión...</p>

    return is_authenticated && user ? (
        <PageContainer
            background={'radial-gradient(circle, rgb(94 43 125) 30%, rgb(61 36 92) 100%)'}>
            <h2>Bienvenido, {user.fullname}</h2>
            <p>Nombre de usuario: {user.username}</p>
            <p>Rol: {user.role}</p>
        </PageContainer>
    ) : (
        <p>No se pudo cargar la información del usuario</p>
    )
}
