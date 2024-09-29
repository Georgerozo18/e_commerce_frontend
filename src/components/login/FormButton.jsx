import '../../styles/components/FormButton.css'

export const FormButton = ({ type, textValue }) => {
    return (
        <button
            type={type}
            className='form_button'>
            {textValue}
        </button>
    )
}
