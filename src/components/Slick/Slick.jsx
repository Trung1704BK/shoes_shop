import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { selectProductDetail } from "../../redux/selector";
import styles from "./Slick.module.scss";

const cx = classNames.bind(styles);
function Slick({ className, children = [], itemShow, slickImage }) {
    const previous = "pre";
    const next = "next";

    const productDetail = useSelector(selectProductDetail);
    const [itemSlickChange, setItemSlickChange] = useState({
        currentPosition: 0,
        currentIndex: 1,
    });

    const [itemSlick, setItemSlick] = useState({
        itemSlickWidth: 162,
        itemSlickShow: 1,
        maxSlick: 0,
        totalInt: 0,
        totalFloat: 0,
    });

    const { currentPosition, currentIndex } = itemSlickChange;
    const { itemSlickWidth, itemSlickShow, maxSlick, totalInt, totalFloat } =
        itemSlick;

    const detectResize = () => {
        let currentImageSize;
        let itemSlickShowValue = 0;
        currentImageSize = children[0]?.ref.current.offsetWidth;

        if (itemShow) {
            //Quantity slick item show
            itemSlickShowValue = itemShow;
        } else {
            //Default slick item show
            if (window.innerWidth >= 576 && window.innerWidth < 768) {
                itemSlickShowValue = 3;
            } else if (window.innerWidth < 576) {
                itemSlickShowValue = 2;
            } else {
                itemSlickShowValue = 4;
            }
        }

        setItemSlick({
            itemSlickShow: itemSlickShowValue,
            itemSlickWidth: currentImageSize,
            maxSlick:
                (children?.length - itemSlickShowValue) * currentImageSize,
            totalInt: Math.floor(children?.length / itemSlickShowValue),
            totalFloat: children?.length % itemSlickShowValue,
        });
    };

    //Handle when button slick click
    const onArrowBtnClick = (navigationValue) => {
        //Handle previous click
        if (navigationValue === previous && currentPosition > 0) {
            //If the currentPosition >= itemSlickWidth * itemSlickShow: currentPosition = translate previous 100%
            if (currentPosition >= itemSlickWidth * itemSlickShow) {
                setItemSlickChange((pre) => ({
                    ...pre,
                    currentPosition:
                        pre.currentPosition - itemSlickWidth * itemSlickShow,
                    currentIndex: pre.currentIndex - 1,
                }));
            }
            //If the currentPosition < itemSlickWidth * itemSlickShow: translate previous = translate previous widthItem *
            else {
                setItemSlickChange((pre) => ({
                    ...pre,
                    currentPosition:
                        //pre.currentPosition + totalFloat * -itemSlickWidth,
                        pre.currentPosition - totalFloat * itemSlickWidth,
                }));
            }
        }
        //Handle next click
        else if (navigationValue === next && currentPosition < maxSlick) {
            //If currentIndex === totalInt: translation = totalFloat * itemSlickWidth
            if (currentIndex === totalInt) {
                setItemSlickChange((pre) => ({
                    ...pre,
                    currentPosition:
                        pre.currentPosition + totalFloat * itemSlickWidth,
                }));
            }
            //If currentIndex < totalInt: translation = itemSlickWidth * itemSlickShow
            else {
                setItemSlickChange((pre) => ({
                    ...pre,
                    currentPosition:
                        pre.currentPosition + itemSlickWidth * itemSlickShow,
                    currentIndex: pre.currentIndex + 1,
                }));
            }
        }
    };

    //Update the total
    useEffect(() => {
        if (slickImage) {
            setItemSlickChange({ currentPosition: 0, currentIndex: 1 });
        }
        detectResize();
    }, [productDetail]);

    useEffect(() => {
        detectResize();
    }, [children]);

    //Handle resize: responsive
    useEffect(() => {
        window.addEventListener("resize", detectResize);
        return () => {
            window.removeEventListener("resize", detectResize);
        };
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("row gx-0", "slick-slide", className)}>
                <button
                    onClick={() => onArrowBtnClick(previous)}
                    className={cx("btn-arrow", "btn-left")}
                >
                    <KeyboardArrowLeftIcon
                        className={cx("icon")}
                    ></KeyboardArrowLeftIcon>
                </button>
                <div
                    className={cx("slick-list")}
                    style={{
                        transform: `translate3d(${-currentPosition}px, 0, 0)`,
                    }}
                >
                    {children}
                </div>
                <button
                    onClick={() => onArrowBtnClick(next)}
                    className={cx("btn-arrow", "btn-right")}
                >
                    <KeyboardArrowRightIcon
                        className={cx("icon")}
                    ></KeyboardArrowRightIcon>
                </button>
            </div>
        </div>
    );
}

export default memo(Slick);
