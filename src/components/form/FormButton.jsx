import '../../styles/components/FormButton.css'

export const FormButton = ({ type, textValue, handleClick }) => {
    return (
        <button
            type={type}
            className='form_button'
            onClick={handleClick}>
            {textValue}
        </button>
    )
}
