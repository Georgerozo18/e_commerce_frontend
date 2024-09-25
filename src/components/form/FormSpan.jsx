import '../../styles/components/FormSpan.css'

export const FormSpan = ({ text, strong_text, handleClick }) => {
    return (
        <span className='form_span'>
            {text}
            <strong onClick={handleClick} className='form_span_strong'>{strong_text}</strong>
        </span>
    )
}
