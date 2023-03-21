import { useEffect, memo } from "react";
import { useRef, useState } from "react";
import classNames from "classnames/bind";
import style from "./SlideText.module.scss";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const cx = classNames.bind(style);
function SlideNew({ children, className }) {
    let preValue = "previous";
    let nextValue = "next";
    const [currentPosition, setCurrentPosition] = useState(0);
    const timeoutRef = useRef();

    const handleChangeSlick = (value = nextValue) => {
        //Handle previous click
        if (value === preValue) {
            //If current position is first will change to last position
            currentPosition === 0
                ? setCurrentPosition(children.length - 1)
                : setCurrentPosition((prePosition) => prePosition - 1);
        } else if (value === nextValue) {
            //If current position is last will change to first position
            currentPosition === children.length - 1
                ? setCurrentPosition(0)
                : setCurrentPosition((prePosition) => prePosition + 1);
        }
    };

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentPosition((prevPosition) =>
                    prevPosition === children.length - 1 ? 0 : prevPosition + 1
                ),
            2000
        );

        return () => {
            resetTimeout();
        };
    }, [currentPosition]);

    return (
        <div className={cx("container-fluid", "wrapper")}>
            <button
                className={cx("slick-arrow")}
                onClick={() => handleChangeSlick(preValue)}
            >
                <KeyboardArrowLeftIcon className={cx("slick-icon")} />
            </button>
            <div className={cx("slick", className)}>
                <div
                    className={cx("slick-list")}
                    // style={{
                    //     transform:
                    //         currentPosition === children.length - 1
                    //             ? `translate3d(${0}%, 0, 0)`
                    //             : `translate3d(${
                    //                   -currentPosition * 100
                    //               }%, 0, 0)`,
                    //     //   opacity: currentPosition === children.length - 1 ?
                    // }}
                    style={{
                        transform: `translate3d(${
                            -currentPosition * 100
                        }%, 0, 0)`,
                        //   opacity: currentPosition === children.length - 1 ?
                    }}
                >
                    {children}
                </div>
            </div>
            <button
                className={cx("slick-arrow")}
                onClick={() => handleChangeSlick(nextValue)}
            >
                <KeyboardArrowRightIcon className={cx("slick-icon")} />
            </button>
        </div>
    );
}

export default memo(SlideNew);
