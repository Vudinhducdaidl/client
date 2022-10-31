import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    // lấy id hiện tại bằng userParam
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }

    }, [params.id, products])


    if (detailProduct.length === 0) return null;
    var formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
    });
    var price = `${detailProduct.price}`;
    return (
        <>
            <div>Thông tin sản phẩm</div>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">

                        <p>Tên sản phẩm :</p><h2>{detailProduct.title}</h2>
                        {/* <h6>#id: {detailProduct.product_id}</h6> */}
                    </div>
                    <span> {formatter.format(price)} .đ</span>
                    {/* <p>{detailProduct.accessories}</p> */}
                    <p>{detailProduct.content}</p>
                    <p>Đã bán: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart"
                        onClick={() => addCart(detailProduct)}>
                        Mua ngay
                    </Link>
                </div>
            </div>

            <div>
                {/* map nhung sp cung product */}
                <h2>Sản phẩm liên quan</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
