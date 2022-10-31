import { useState, useEffect } from 'react'
import axios from 'axios'


function ProductsPromoAPI() {
    const [promo, setPromo] = useState([])
    const [callback, setCallback] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const getPromo = async () => {
            const res = await axios.get(`/api/productspromo`)
            setPromo(res.data)
        }
        getPromo()
    }, [callback, page])
    // console.log("asdhjkasdghjhjk", promo)

    return (
        {
            promo: [promo, setPromo],
            page: [page, setPage],
            callback: [callback, setCallback]
        }
    )
}

export default ProductsPromoAPI

