import classNames from "classnames/bind";
import styles from "./CheckboxCustom.module.scss";

const cx = classNames.bind(styles);
function CheckboxCustom({ className, data, type = "checkbox" }) {
    return (
        <div className={cx(className, "wrapper")}>
            <div className={cx("checkbox-1")}>
                <input
                    id={data.id}
                    type={type}
                    name={data.group}
                    className={cx("order-ckb")}
                />
                <label htmlFor={data.id} className={cx("order-ckb-label")} />
            </div>
            <span className={cx("checkbox-title-1")}>{data.title}</span>
            {data.image && (
                <img
                    className={cx("checkbox-img")}
                    src={data?.image}
                    alt="paymentImg"
                />
            )}
        </div>
    );
}

export default CheckboxCustom;
