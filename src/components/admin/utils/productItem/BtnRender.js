import React from 'react'
import { Link } from 'react-router-dom'


function BtnRender({ product, deleteProduct }) {
    // console.log("type nè", product.type)
    return (

        <div className="row_btn">
            <>
                <Link id="btn_buy" to="#!"
                    onClick={() => deleteProduct(product._id, product.images.public_id)}>
                    Xóa
                </Link>
                {/* sử dụng if else để chọn đường dẫn sửa sản phẩm */}
                {
                    product.type === 'camera' ?
                        <Link id="btn_view" to={`/dashboard/edit_camera_product/${product._id}`}>
                            Sửa
                        </Link>
                        :
                        product.type === 'lock' ?
                            <Link id="btn_view" to={`/dashboard/edit_lockHome_product/${product._id}`}>
                                Sửa
                            </Link>
                            : product.type === 'lockhotel' ?
                                <Link id="btn_view" to={`/dashboard/edit_lockHotel_product/${product._id}`}>
                                    Sửa
                                </Link> :
                                product.type === 'SmartHome' ?
                                    <Link id="btn_view" to={`/dashboard/edit_smarthome_product/${product._id}`}>
                                        Sửa
                                    </Link>
                                    :
                                    <Link id="btn_view" to={`/dashboard/edit_hdmi_product/${product._id}`}>
                                        Sửa
                                    </Link>
                }

            </>
        </div>
    )
}

export default BtnRender
