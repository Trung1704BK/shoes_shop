import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Button({ className, children, onClick }) {
    return (
        <button className={cx("btn-primary", className)} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
