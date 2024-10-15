import '../../styles/components/products/Modal.css'

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    )
}
