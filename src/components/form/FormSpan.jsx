import '../../styles/components/FormSpan.css'

export const FormSpan = ({ text, strong_text }) => {
    return (
        <span className='form_span'>
            {text}
            <strong className='form_span_strong'>{strong_text}</strong>
        </span>
    )
}
