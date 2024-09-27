import { useSelector } from 'react-redux'

export const Profile = () => {
    const {
        user,
        is_authenticated,
        is_loading
    } = useSelector(state => state.login_slice)

    if (is_loading) return <p>Verificando sesión...</p>

    return is_authenticated && user ? (
        <div>
            <h2>Bienvenido, {user.fullname}</h2>
            <p>Nombre de usuario: {user.username}</p>
            <p>Rol: {user.role}</p>
        </div>
    ) : (
        <p>No se pudo cargar la información del usuario</p>
    )
}
