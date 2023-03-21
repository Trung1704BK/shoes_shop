import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import config from "../../../../config";
import { useSelector } from "react-redux";
import { selectCart, selectWishList } from "../../../../redux/selector";

const cx = classNames.bind(styles);

function Menu({ className, onClick }) {
    let id = 0;
    const wishList = useSelector(selectWishList);
    const cartList = useSelector(selectCart);
    const listMenu = [
        {
            id: id++,
            title: "Tra cứu đơn hàng",
            icon: LocalShippingIcon,
            to: config.routes.searchOrder,
        },
        {
            id: id++,
            title: " Tìm cửa hàng",
            icon: LocationOnIcon,
            to: config.routes.stores,
        },
        {
            id: id++,
            title: `Yêu thích (${wishList.length})`,
            icon: FavoriteIcon,
            to: config.routes.wishlist,
        },
        {
            id: id++,
            title: `Giỏ hàng (${cartList.length})`,
            icon: LocalMallIcon,
            to: config.routes.cart,
        },
    ];
    return (
        <div className={cx("wrapper", className)}>
            <ul className={cx("menu")}>
                {listMenu.map((menu) => {
                    const Icon = menu.icon;
                    return (
                        <li
                            className={cx("menu-item")}
                            key={menu.id}
                            onClick={onClick}
                        >
                            <Icon className={cx("icon")} />
                            <Link className={cx("link")} to={menu.to}>
                                {menu.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Menu;
