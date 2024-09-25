import '../../styles/components/FormContainer.css'

export const FormContainer = ({ children }) => {
    return (
        <form className="form_container">
            {children}
        </form>
    )
}

export const TitleContainer = ({ children }) => {
    return (
        <div className='form_title_container'>
            {children}
        </div>
    )
}