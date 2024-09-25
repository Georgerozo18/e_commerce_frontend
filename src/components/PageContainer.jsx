import '../styles/components/PageContainer.css'
export const PageContainer = ({ children, background }) => {
    return (
        <div
            style={{ background: background }}
            className="page_container page_center">
            {children}
        </div>
    )
}