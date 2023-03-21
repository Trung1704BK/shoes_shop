import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./EmptyProduct.module.scss";
import Button from "../Button/Button";
import config from "../../config";

const cx = classNames.bind(styles);
function EmptyProduct({ headerTitle, title }) {
    const navigate = useNavigate();

    const backProductClick = () => {
        navigate(config.routes.product);
    };

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("header-title")}>{headerTitle}</h2>
            <div className={cx("divider")}></div>
            <h3 className={cx("title")}>{title}</h3>
            <Button className={cx("btn-buy")} onClick={backProductClick}>
                Tiếp tục mua hàng
            </Button>
        </div>
    );
}

export default EmptyProduct;
