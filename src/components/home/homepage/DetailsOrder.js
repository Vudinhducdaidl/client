import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DetailsOrder() {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            history.forEach((item) => {
                if (item._id === params.id) setOrderDetails(item);
            });
        }
    }, [params.id, history]);
    var formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',
    });

    if (orderDetails.length === 0) return null;

    return (
        <div className="history-page py-4">
            <div className="w-fit">
                <Link to="/history_oder">
                    <div className="w-fit flex p-2 my-2 items-center border border-gray-400 rounded-xl text-gray-600 hover:bg-gray-800 hover:text-white">
                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                        <p className="uppercase ml-2 ">quay về</p>
                    </div>
                </Link>
            </div>
            <h1 className="uppercase text-xl text-gray-600 my-4">
                Thông tin đơn hàng
            </h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền (số lượng * giá)</th>
                        {/* <th>Tạm tính (data)</th>
                        <th>thành tiền đã giảm 5%</th> */}
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.cart.map((item) => (
                        <tr key={item._id}>
                            <td className="flex justify-center">
                                <img src={item.images.url} alt="" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{formatter.format(`${item.price}`)}.đ</td>
                            <td>{formatter.format(`${item.price * item.quantity}`)}.đ</td>
                            {/* <td>{formatter.format(`${item.provisional}`)}.đ</td>
                                <td>{formatter.format(`${item.total}`)}.đ</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DetailsOrder;
