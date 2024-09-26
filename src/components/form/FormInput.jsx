import '../../styles/components/FormInput.css'
export const FormInput = ({ type, placeholder, label, value, onChange }) => {
    return (
        <div className='form_control'>
            <label className='form_label'>{label}</label>
            <input
                type={type}
                className='form_input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required />
        </div>
    )
}
