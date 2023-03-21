import classNames from "classnames/bind";
import styles from "./Brand.module.scss";
import logo from "../../../../../asset/icon/Logo_Ananas_Header.svg";
import config from "../../../../../config";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function Brand() {
    const navigate = useNavigate();
    const onLogoClick = () => {
        navigate(config.routes.home);
    };
    return (
        <div
            className={cx("col-2 col-xl-1 col-lg-2 col-md-2 col-sm-2", "brand")}
        >
            <img
                src={logo}
                className={cx("logo")}
                alt="logo"
                onClick={onLogoClick}
            />
        </div>
    );
}

export default Brand;
