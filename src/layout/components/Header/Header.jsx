import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import SlideNew from "../../../components/SlideText/SlideText";

const cx = classNames.bind(styles);
function Header() {
    let id = 0;
    const slickList = [
        { id: id++, title: "HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH" },
        { id: id++, title: "BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE" },
        { id: id++, title: "FREE SHIPPING VỚI HOÁ ĐƠN TỪ 800K !" },
        { id: id++, title: "BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN" },
    ];
    return (
        <div className={cx("header")}>
            <Menu className={cx("header-menu")}></Menu>
            <Navbar></Navbar>
            <SlideNew className={cx("header-slick")}>
                {slickList.map((item) => (
                    <span key={item.id} className={cx("slick-item")}>
                        {item.title}
                    </span>
                ))}
            </SlideNew>
        </div>
    );
}

export default Header;
