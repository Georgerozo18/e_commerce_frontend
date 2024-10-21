import '../../styles/components/global/PageTitle.css'

export const PageTitle = ({ title, className }) => {
    return (
        <h2 className={className}>{title}</h2>
    )
}