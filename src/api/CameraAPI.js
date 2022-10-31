import { useState, useEffect } from 'react'
import axios from 'axios'


function CameraAPI() {
    const [camera, setCamera] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        const getCamera = async () => {
            const res = await axios.get('/api/cameras')
            setCamera(res.data)
        }
        getCamera()
    }, [callback])
    return (
        {
            camera: [camera, setCamera],
            callback: [callback, setCallback]
        }
    )
}

export default CameraAPI

