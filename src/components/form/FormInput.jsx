import '../../styles/components/FormInput.css'
export const FormInput = ({ type, placeholder, label, value, name, onChange, min, max }) => {
    return (
        <div className='form_control'>
            <label className='form_label'>{label}</label>
            <input
                type={type}
                className='form_input'
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                required />
        </div>
    )
}

export const FormTextArea = ({ placeholder, label, value, name, onChange }) => {
    return (
        <div className='form_control'>
            <label className='form_label'>{label}</label>
            <textarea
                className='form_textarea'
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required />
        </div>
    )
}

export const FormSelect = ({ label, value, name, onChange, options, }) => {
    return (
        <div className='form_control'>
            <label className='form_label'>{label}</label>
            <select
                className='form_select'
                name={name}
                value={value}
                onChange={onChange}
                required >
                <option value=''>Select a category</option>
                {
                    options && options.map((option, index) => (
                        <option key={index} value={option._id}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    )
}
