import classNames from "classnames/bind";
import Button from "../../components/Button/Button";
import styles from "./SearchOrder.module.scss";

const cx = classNames.bind(styles);
function SearchOrder() {
    return (
        <div className={cx("container-lg gx-0", "wrapper")}>
            <div className={cx("row gx-0 d-flex justify-content-center")}>
                <h1 className={cx("col-12 col-xxl-8 col-xl-8 col-lg-8")}>
                    TRA CỨU ĐƠN
                </h1>
                <div
                    className={cx(
                        "col-12 col-xxl-8 col-xl-8 col-lg-8",
                        "form-group"
                    )}
                >
                    <input type="text" placeholder="Mã vận đơn" />
                </div>

                <div
                    className={cx(
                        "col-12 col-xxl-8 col-xl-8 col-lg-8",
                        "form-group"
                    )}
                >
                    <input type="text" placeholder="Email/ Số điện thoại" />
                </div>

                <Button className={cx("col-12 col-xxl-8 col-xl-8 col-lg-8")}>
                    TRA CỨU ĐƠN HÀNG
                </Button>
            </div>
        </div>
    );
}

export default SearchOrder;
