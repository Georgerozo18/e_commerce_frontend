import '../styles/components/PageContainer.css'
export const PageContainer = ({ children, appTitle, backgroundColor }) => {
    return (
        <div
            style={{ backgroundColor: backgroundColor }}
            className="pageContainer">
            <h1>{appTitle}</h1>
            {children}
        </div>
    )
}