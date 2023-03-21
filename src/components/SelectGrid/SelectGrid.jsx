import styles from "./SelectGrid.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const cx = classNames.bind(styles);

function SelectGrid({ className, data, currentValue, dropClick, name }) {
    const listData = data || [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const refDropDown = useRef();
    const [dropdown, setDropDown] = useState({
        show: false,
        itemValue: currentValue || listData[0],
    });
    const { show, itemValue } = dropdown;

    //Handle when dropdown change
    const handleDropClick = (item) => {
        setDropDown({ show: !show, itemValue: item });
        dropClick(name, item);
    };

    //Handle show/hide dropdown
    const handleShowDropdown = () => {
        setDropDown({ ...dropdown, show: !show });
    };

    //Set current value for select grid
    useEffect(() => {
        setDropDown({ ...dropdown, itemValue: currentValue });
    }, [currentValue]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                refDropDown.current &&
                !refDropDown.current.contains(event.target)
            ) {
                setDropDown((pre) => ({ ...pre, show: !pre.show }));
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refDropDown]);

    return (
        <div className={cx("wrapper")}>
            <button
                onClick={handleShowDropdown}
                className={cx("btn-drop", className)}
            >
                <span className={cx("title")}>{itemValue}</span>
                <KeyboardArrowDownIcon className={cx("icon")} />
            </button>
            {show && (
                <div className={cx("dropdown")} ref={refDropDown}>
                    <div className={cx("grid-container")}>
                        {listData.map((item, index) => (
                            <div
                                key={index}
                                className={cx("grid-item", {
                                    active: item === itemValue,
                                })}
                                onClick={() => handleDropClick(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default SelectGrid;
