import classNames from "classnames/bind";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styles from "./PanelGroup.module.scss";

const cx = classNames.bind(styles);

function PanelGroup({
    children,
    onClick,
    show,
    header = "THIS IS HEADER",
    className,
    twoline,
}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("panel-header", className)} onClick={onClick}>
                <h2
                    className={cx("header-item", "header-title", {
                        active: show,
                    })}
                >
                    {header}
                </h2>
                <KeyboardArrowDownIcon
                    className={cx("header-item", "icon-arrow", {
                        "active-icon": show,
                    })}
                ></KeyboardArrowDownIcon>
            </div>
            <div className={cx({ line: twoline && show })}></div>
            <div className={cx("panel-content", { show: show })}>
                {children}
            </div>
            <div className={cx("line")}></div>
            <div className={cx("box1")}></div>
            <div className={cx("box2")}></div>
        </div>
    );
}

export default PanelGroup;
