import '../../styles/components/global/Button.css'

export const Button = ({ textValue, disabled, onClick, extra_class }) => {
    return (
        <button
            className={extra_class || 'app_button'}
            onClick={onClick}
            disabled={disabled}>
            {textValue}
        </button>
    )
}
