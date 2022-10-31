import { useState, useEffect } from 'react'
import axios from 'axios'


function SlideAPI() {

    const [slide, setSlide] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        const getslides = async () => {
            const res = await axios.get('/api/slide')
            setSlide(res.data)
        }

        getslides()
    }, [callback])
    return (
        {
            slides: [slide, setSlide],
            callback: [callback, setCallback]
        }

    )
}

export default SlideAPI

