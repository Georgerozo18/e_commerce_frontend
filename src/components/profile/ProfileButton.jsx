import React from 'react'

export const ProfileButton = ({ handleLogout }) => {
    return (
        <button className='profile_button' onClick={handleLogout}>
            Logout
        </button>
    )
}
