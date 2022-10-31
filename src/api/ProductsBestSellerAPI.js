import { useState, useEffect } from 'react'
import axios from 'axios'


function ProductsBestSellerAPI() {
    const [bestSeller, setBestSeller] = useState([])
    const [callback, setCallback] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const getBestSeller = async () => {
            const res = await axios.get(`/api/productsbestseller`)
            setBestSeller(res.data)
        }
        getBestSeller()
    }, [callback, page])
    // console.log("asdhjkasdghjhjk", BestSeller)

    return (
        {
            bestSeller: [bestSeller, setBestSeller],
            page: [page, setPage],
            callback: [callback, setCallback]
        }
    )
}

export default ProductsBestSellerAPI

