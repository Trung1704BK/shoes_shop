import classNames from "classnames/bind";

import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);
function Loading({ className }) {
    return <span className={cx("loading", className)}></span>;
}

export default Loading;
