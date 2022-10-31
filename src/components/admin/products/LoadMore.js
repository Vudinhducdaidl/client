import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <div className="load_more">
            {
                result < page * 8 ?
                    <button onClick={() => setPage(page - 1)}>rút gọn</button>
                    :
                    <button onClick={() => setPage(page + 1)}>xem thêm</button>
            }

        </div>

    )
}

export default LoadMore
