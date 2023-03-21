import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import classNames from "classnames/bind";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import styles from "./Card.module.scss";
import config from "../../config/";
import Button from "../Button/Button";
import {
    addProductId,
    addWishList,
    addBreadCrumb,
} from "../../redux/slice/productSlice";
import { selectWishList } from "../../redux/selector";
import { sizeList, quantityList } from "../../data/productDetail";

const cx = classNames.bind(styles);
function Cart({ className, data, cardSlick = false }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Get wishlist for the heart icon
    const wishList = useSelector(selectWishList);
    const [selectGrid, setSelectGrid] = useState({
        size: sizeList[0],
        quantity: quantityList[0],
    });
    //Handle card click
    const handleCardClick = (id) => {
        //Dispatch id product
        dispatch(addProductId(id));
        //Dispatch breadcrumb data
        const breadcrumbList = [
            { title: "Trang chủ", to: config.routes.home },
            {
                title: data.categorys_title.line_title,
                to: config.routes.product,
                fk_category_line_id: data.fk_category_line_id,
            },
            {
                title: data.product_name,
            },
        ];
        dispatch(addBreadCrumb(breadcrumbList));
        //Navigator to the detail
        navigate(config.routes.productDetail);
    };

    //Handle when favorite icon click
    const handleAddWishList = (product) => {
        const obj = Object.preventExtensions(product);
        const newObj = {
            ...obj,
            size: selectGrid.size,
            quantity: selectGrid.quantity,
        };
        dispatch(addWishList(newObj));
    };

    return (
        <div className={cx("wrapper", className)}>
            <div className={cx("card-custom")}>
                <div className={cx("card-image")}>
                    <img
                        className={cx("image")}
                        src={
                            process.env.REACT_APP_URL_STATIC_FILE +
                            data.product_images[0]?.image
                        }
                        onClick={() => handleCardClick(data?.id)}
                        alt="demo"
                    />
                    <img
                        className={cx("image")}
                        src={
                            process.env.REACT_APP_URL_STATIC_FILE +
                            data.product_images[1]?.image
                        }
                        onClick={() => handleCardClick(data?.id)}
                        alt="demo"
                    />
                </div>
                <div className={cx("btn-container")}>
                    {!cardSlick && (
                        <>
                            <Button
                                className={cx("btn-buy")}
                                onClick={() => handleCardClick(data?.id)}
                            >
                                MUA NGAY
                            </Button>
                            {wishList.find((item) => item.id === data.id) ? (
                                <FavoriteIcon
                                    className={cx("btn-favorite", "active")}
                                    onClick={() => handleAddWishList(data)}
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    className={cx("btn-favorite")}
                                    onClick={() => handleAddWishList(data)}
                                />
                            )}
                        </>
                    )}
                </div>
                <div
                    className={cx("description")}
                    onClick={() => handleCardClick(data?.id)}
                >
                    <h3 className={cx("type")}>
                        {data?.categorys_title?.status_title}
                    </h3>
                    <h3 className={cx("des-item", "name")}>
                        {data.product_name.toLowerCase() +
                            " - " +
                            data?.categorys_title?.style_title.toLowerCase()}
                    </h3>
                    <h3 className={cx("des-item", "color")}>
                        {data?.categorys_title?.material_title.toLowerCase()}
                    </h3>
                    <h3 className={cx("des-item", "price")}>
                        {data?.product_price?.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Cart;
