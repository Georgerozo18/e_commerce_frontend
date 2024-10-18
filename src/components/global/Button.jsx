import '../../styles/components/global/Button.css'

export const Button = ({ textValue, disabled, onClick }) => {
    return (
        <button
            className={`app_button`}
            onClick={onClick}
            disabled={disabled}>
            {textValue}
        </button>
    )
}
