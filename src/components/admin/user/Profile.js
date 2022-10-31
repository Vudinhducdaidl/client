
import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

// import { useParams } from 'react-router-dom'


function Profile() {

    const state = useContext(GlobalState)
    const [users] = state.userAPI.users
    return (
        <>
            <div>
                <div>name: {users.name}</div>
                <div>mail: {users.email}</div>
                <div>phone: {users.phone}</div>
            </div>
            <button >Sửa</button>

        </>

    )
}

export default Profile