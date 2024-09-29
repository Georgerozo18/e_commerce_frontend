import '../../styles/components/FormContainer.css'

export const FormContainer = ({ children, handleSubmit }) => {
    return (
        <form className="form_container" onSubmit={handleSubmit}>
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