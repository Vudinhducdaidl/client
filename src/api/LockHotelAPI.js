import { useState, useEffect } from 'react'
import axios from 'axios'


function LockHotelAPI() {
    const [lockhotel, setLockHotel] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        const getLockHotel = async () => {
            const res = await axios.get('/api/lockhotels')
            setLockHotel(res.data)
        }
        getLockHotel()
    }, [callback])


    return (
        {
            lockhotel: [lockhotel, setLockHotel],
            callback: [callback, setCallback]
        }
    )
}

export default LockHotelAPI

