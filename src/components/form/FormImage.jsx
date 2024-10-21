import '../../styles/components/FormImage.css'

export const FormImage = ({ icon_url }) => {
    return (
        <img className='form_image' src={icon_url} />
    )
}
