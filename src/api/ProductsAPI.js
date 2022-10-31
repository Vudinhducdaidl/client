import { useState, useEffect } from 'react'
import axios from 'axios'


function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [productspromo, setProductspromo] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)



    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page * 15}&${category}&${brand}&${sort}&name[regex]=${search}`)
            // const res1 = await axios.get(`/api/products?limit=${page * 8}&${category}&${sort}&name[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()

    }, [callback, category, sort, search, page, brand])
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        brand: [brand, setBrand],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        productspromo: [productspromo, setProductspromo]
    }
}

export default ProductsAPI
