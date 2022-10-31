import React from 'react'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
    // TẠO HÀM FOMAT HIỂN THỊ SỐ TIỀN
    var formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
    });
    var price = `${product.price}`;
    // var formated_sum = Number(sum.toFixed(2)).toLocaleString("de-DE", { style: "currency", currency: "VN" });
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }
            <Link to={`/detail/${product._id}`}>
                <img src={product.images.url} alt="" />
                <div className="product_box">
                    <h2 title={product.title}>{product.title}</h2>
                    <span>{formatter.format(price)}.đ</span>

                </div>
                <BtnRender product={product} deleteProduct={deleteProduct} />
            </Link>
        </div>

    )
}

export default ProductItem
