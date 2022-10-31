import { useState, useEffect } from 'react'
import axios from 'axios'


function SmartHomeAPI() {
    const [smartHome, setSmartHome] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        const getSmartHome = async () => {
            const res = await axios.get('/api/smarthomes')
            setSmartHome(res.data)
        }
        getSmartHome()
    }, [callback])
    // console.log("asdhjkasdghjhjk", brands)

    return (
        {
            smartHome: [smartHome, setSmartHome],
            callback: [callback, setCallback]
        }
    )
}

export default SmartHomeAPI

