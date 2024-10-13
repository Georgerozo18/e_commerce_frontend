import '../../styles/components/FormButton.css'

export const FormButton = ({ type, textValue, disabled }) => {
    return (
        <button
            type={type}
            className='form_button'
            disabled={disabled}>
            {textValue}
        </button>
    )
}
