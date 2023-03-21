import classNames from "classnames/bind";
import styles from "./MenuIcon.module.scss";
const cx = classNames.bind(styles);
function MenuIcon({ className }) {
    return (
        <div className={cx(className)}>
            <label for="check">
                <input type="checkbox" id="check" />
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
}

export default MenuIcon;
