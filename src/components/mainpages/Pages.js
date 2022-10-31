import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import DetailProducts from './createProduct/detailProducts'
import Profile from './user/Profile'




import { GlobalState } from '../../GlobalState'
import Brands from './brand/Brands'
import Slide from './createSlide/Slide'
import User from './user/Users'



function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Products} />
            {/* <Route isAdmin path="/" exact component={Products} /> */}
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/profile/:id" exact component={isLogged ? Profile : NotFound} />
            {/* <Route path="/editprofile/:id" exact component={isLogged ? EditProfile : NotFound} /> */}

            {/* <Route path="/register" exact component={isLogged ? NotFound : Register} /> */}


            <Route path="/brand" exact component={isAdmin ? Brands : NotFound} />
            <Route path="/slide" exact component={isAdmin ? Slide : NotFound} />
            <Route path="/slide/:id" exact component={isAdmin ? Slide : NotFound} />


            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/users" exact component={isAdmin ? User : NotFound} />

            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/detailProduct" exact component={isAdmin ? DetailProducts : NotFound} />

            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} />


            <Route path="*" exact component={NotFound} />







        </Switch>
    )
}

export default Pages
