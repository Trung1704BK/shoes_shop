import { lazy } from "react";
import config from "../config";

import Cart from "../page/Cart/Cart";
import Home from "../page/Home/Home";
import Product from "../page/Product/Product";
import ProductDetail from "../page/ProductDetail/ProductDetail";
import SearchOrder from "../page/SearchOrder/SearchOrder";
import Store from "../page/Store/Store";
import WishList from "../page/WishList/WishList";
import MainLayout from "../layout/MainLayout/MainLayout";
import Order from "../page/Order/Order";
import Search from "../page/Search/Search";

// const Cart = lazy(() => import("../page/Cart/Cart"));
// const Home = lazy(() => import("../page/Home/Home"));
// const Product = lazy(() => import("../page/Product/Product"));
// const ProductDetail = lazy(() => import("../page/ProductDetail/ProductDetail"));
// const SearchOrder = lazy(() => import("../page/SearchOrder/SearchOrder"));
// const Store = lazy(() => import("../page/Store/Store"));
// const WishList = lazy(() => import("../page/WishList/WishList"));
// const MainLayout = lazy(() => import("../layout/MainLayout/MainLayout"));
// const Order = lazy(() => import("../page/Order/Order"));
// const Search = lazy(() => import("../page/Search/Search"));

export const publicRouter = [
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout,
    },
    {
        path: config.routes.product,
        component: Product,
        layout: MainLayout,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        layout: MainLayout,
    },
    {
        path: config.routes.searchOrder,
        component: SearchOrder,
        layout: MainLayout,
    },
    {
        path: config.routes.stores,
        component: Store,
        layout: MainLayout,
    },
    {
        path: config.routes.wishlist,
        component: WishList,
        layout: MainLayout,
    },
    {
        path: config.routes.cart,
        component: Cart,
        layout: MainLayout,
    },
    {
        path: config.routes.order,
        component: Order,
        layout: MainLayout,
    },
    {
        path: config.routes.search,
        component: Search,
        layout: MainLayout,
    },
];
