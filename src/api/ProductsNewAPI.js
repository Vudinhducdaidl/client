import { useState, useEffect } from 'react'
import axios from 'axios'


function ProductsNewAPI() {
    const [newProduct, setNewProduct] = useState([])
    const [callback, setCallback] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const getNewProduct = async () => {
            const res = await axios.get(`/api/productsnew`)
            setNewProduct(res.data)
        }
        getNewProduct()
    }, [callback, page])

    return (
        {
            newProduct: [newProduct, setNewProduct],
            page: [page, setPage],
            callback: [callback, setCallback]
        }
    )
}

export default ProductsNewAPI

