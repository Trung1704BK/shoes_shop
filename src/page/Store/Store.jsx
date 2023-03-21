import classNames from "classnames/bind";
import styles from "./Store.module.scss";

const cx = classNames.bind(styles);
function Store() {
    return (
        <div className={cx("container-lg gx-0", "wrapper")}>
            <div className={cx("row gx-0 d-flex justify-content-center")}>
                <h1 className={cx("col-12 col-xxl-8 col-xl-8 col-lg-8")}>
                    CHỨC NĂNG ĐANG TRONG QUÁ TRÌNH PHÁT TRIỂN
                </h1>
            </div>
        </div>
    );
}

export default Store;
