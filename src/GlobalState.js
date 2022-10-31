import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import BrandAPI from './api/BrandAPI';
import ProductsBestSellerAPI from './api/ProductsBestSellerAPI';
import ProductsPromoAPI from './api/ProductsPromoAPI';
import ProductsNewAPI from './api/ProductsNewAPI';





import CategoriesAPI from './api/CategoriesAPI';
import SlideAPI from './api/SlideAPI';
import SmartHomeAPI from './api/SmartHomeAPI';
import CameraAPI from './api/CameraAPI';
import LockhomeAPI from './api/LockHomeAPI';
import LockHotelAPI from './api/LockHotelAPI';

import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token');
                setToken(res.data.accesstoken);
                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000);
            };
            refreshToken();
        }
    }, []);

    // tạo State để lưu tất cả những data cần sử dụng chung truyền qua state

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        brandsAPI: BrandAPI(),
        productsAPI: ProductsAPI(),
        slideAPI: SlideAPI(),
        smartHomeAPI: SmartHomeAPI(),
        cameraAPI: CameraAPI(),
        lockHotelAPI: LockHotelAPI(),
        lockhomeAPI: LockhomeAPI(),
        productsBestSellerAPI: ProductsBestSellerAPI(),
        productsPromoAPI: ProductsPromoAPI(),
        productsNewAPI: ProductsNewAPI(),
    };

    return <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>;
};
