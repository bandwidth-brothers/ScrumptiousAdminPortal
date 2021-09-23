import React, { useEffect } from 'react'
//import axios from 'axios'

//import { getAuthToken } from '../../../Auth/authAxios'

import { useDispatch } from 'react-redux'
import { changeTitle } from '../../../redux/actions/ActionsIndex'

const AdminHomepage = () => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(changeTitle('Home'))
        // axios.get('http://localhost:9041/admin', { id: localStorage.getItem('userID') }, { headers: { 'Authorization': getAuthToken() } })
        //     .then(res => {
        //         console.log(res.data)
        //     }).catch(err => {

        //     })
    })

    return (
        <div>
            ADMIN HOMEPAGE
        </div>
    )
}

export default AdminHomepage
