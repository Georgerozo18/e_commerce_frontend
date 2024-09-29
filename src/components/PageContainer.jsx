import '../styles/components/PageContainer.css'
export const PageContainer = ({ children, background, className }) => {
    return (
        <div
            style={{ background: background }}
            className={`page_container ${className ? className : "page_center"}`}>
            {children}
        </div>
    )
}