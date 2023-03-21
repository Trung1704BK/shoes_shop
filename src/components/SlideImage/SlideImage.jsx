import { useState, useRef, useEffect, memo } from "react";
import classNames from "classnames/bind";
import styles from "./SlideImage.module.scss";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const cx = classNames.bind(styles);
function SlideImage({ children, className, timeSlide }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeoutRef = useRef();
    const nextValue = "next";
    const previousValue = "pre";

    //Handle when click dots slide
    const handleSelectCurrentSlide = (index) => {
        setCurrentSlide(index);
    };

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    //Handle timer image slide
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentSlide((preSlide) =>
                    preSlide === children.length - 1 ? 0 : preSlide + 1
                ),
            timeSlide
        );

        return () => {
            resetTimeout();
        };
    }, [currentSlide]);

    const handleSlideChange = (value) => {
        if (value === previousValue) {
            //If current position is first will change to last position
            currentSlide === 0
                ? setCurrentSlide(children.length - 1)
                : setCurrentSlide((preSlide) => preSlide - 1);
        } else if (value === nextValue) {
            //If current position is last will change to first position
            currentSlide === children.length - 1
                ? setCurrentSlide(0)
                : setCurrentSlide((preSlide) => preSlide + 1);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("slide-container", className)}>
                <div
                    className={cx("slide")}
                    style={{
                        transform:
                            currentSlide === children.length
                                ? `translate3d(${100}%, 0, 0)`
                                : `translate3d(${-currentSlide * 100}%, 0, 0)`,
                    }}
                >
                    {children}
                </div>

                <button
                    onClick={() => handleSlideChange(previousValue)}
                    className={cx("slide-btn", "btn-pre")}
                >
                    <KeyboardArrowLeftIcon className={cx("arrow-icon")} />
                </button>
                <button
                    onClick={() => handleSlideChange(nextValue)}
                    className={cx("slide-btn", "btn-next")}
                >
                    <KeyboardArrowRightIcon className={cx("arrow-icon")} />
                </button>

                <div className={cx("slick-dots")}>
                    {children.map((slide, index) => (
                        <button
                            key={index}
                            className={cx("slide-button", {
                                active: currentSlide === index,
                            })}
                            onClick={() => handleSelectCurrentSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(SlideImage);
