import '../../styles/components/FormError.css'

export const FormError = ({ signin_error }) => {
    return (
        <p className="error_message">{signin_error}</p>
    )
}
