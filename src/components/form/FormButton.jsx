import '../../styles/components/FormButton.css'

export const FormButton = ({ type, textValue, disabled, className }) => {
    return (
        <button
            type={type}
            className={`form_button ${className}`}
            disabled={disabled}>
            {textValue}
        </button>
    )
}
