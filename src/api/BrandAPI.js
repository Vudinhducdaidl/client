import { useState, useEffect } from 'react'
import axios from 'axios'


function BrandAPI() {
    const [brands, setBrands] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        const getbrands = async () => {
            const res = await axios.get('/api/brand')
            setBrands(res.data)
        }
        getbrands()
    }, [callback])

    return (
        {
            brands: [brands, setBrands],
            callback: [callback, setCallback]
        }
    )
}

export default BrandAPI

