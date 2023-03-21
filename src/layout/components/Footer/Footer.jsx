import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import shopImg from "../../../asset/images/footer/Store.svg";
import brandImg from "../../../asset/images/footer/Logo_Ananas_Footer.svg";
import licenseImg from "../../../asset/images/footer/icon_bocongthuong.png";

const cx = classNames.bind(styles);
function Footer() {
    const [showList, setShowList] = useState([]);

    let id = 0;
    const footerList = [
        {
            id: id++,
            header: "SẢN PHẨM",
            list: [
                {
                    id: id++,
                    title: "Giày Nam",
                    to: "",
                },
                {
                    id: id++,
                    title: "Giày Nữ",
                    to: "",
                },
                {
                    id: id++,
                    title: "Thời trang & Phụ kiện",
                    to: "",
                },
                {
                    id: id++,
                    title: "Sale-off",
                    to: "",
                },
            ],
        },
        {
            id: id++,
            header: "VỀ CÔNG TY",
            list: [
                {
                    id: id++,
                    title: "Dứa tuyển dụng",
                    to: "",
                },
                {
                    id: id++,
                    title: "Liên hệ nhượng quyền",
                    to: "",
                },
                {
                    id: id++,
                    title: "Về Ananas",
                    to: "",
                },
            ],
        },
        {
            id: id++,
            header: "HỖ TRỢ",
            list: [
                {
                    id: id++,
                    title: "FAQs",
                    to: "",
                },
                {
                    id: id++,
                    title: "Bảo mật thông tin",
                    to: "",
                },
                {
                    id: id++,
                    title: "Chính sách chung",
                    to: "",
                },
                {
                    id: id++,
                    title: "Tra cứu đơn hàng",
                    to: "",
                },
            ],
        },
        {
            id: id++,
            header: "LIÊN HỆ",
            list: [
                {
                    id: id++,
                    title: "Email góp ý",
                    to: "",
                },
                {
                    id: id++,
                    title: "Hotline",
                    to: "",
                },
                {
                    id: id++,
                    title: "0963 429 749",
                    to: "",
                },
            ],
        },
    ];
    const socials = [
        {
            id: id++,
            icon: FacebookIcon,
            link: "",
        },
        {
            id: id++,
            icon: InstagramIcon,
            link: "",
        },
        {
            id: id++,
            icon: YouTubeIcon,
            link: "",
        },
    ];

    const handleShowList = (index) => {
        if (showList.includes(index)) {
            setShowList((preList) => preList.filter((item) => item !== index));
        } else {
            setShowList((preList) => [...preList, index]);
        }
    };
    return (
        <div className={cx("container-fluid gx-0", "wrapper")}>
            <div className={cx("row gx-0", "footer")}>
                <div className={cx("col-3", "search-shop")}>
                    <img src={shopImg} alt="" />
                    <button className={cx("btn-search-shop")}>
                        TÌM CỬA HÀNG
                    </button>
                </div>
                <div
                    className={cx(
                        "col-12 col-xxl-9 col-xl-9 col-lg-9",
                        "footer-info"
                    )}
                >
                    <div className={cx("row", "footer-container")}>
                        {footerList.map((item, index) => (
                            <div
                                key={index}
                                className={cx(
                                    "col-12 col-xxl-3 col-xl-3 col-lg-3"
                                )}
                                onClick={() => handleShowList(index)}
                            >
                                <div
                                    className={cx(
                                        "item-menu_mobile",
                                        "container-dashed-line",
                                        {
                                            active: showList.includes(index),
                                        }
                                    )}
                                >
                                    <h3 className={cx("footer-list_header")}>
                                        {item.header}
                                    </h3>
                                    <KeyboardArrowDownIcon
                                        className={cx("icon-arrow")}
                                    ></KeyboardArrowDownIcon>
                                </div>

                                <div
                                    className={cx(
                                        "list",
                                        "container-dashed-line",
                                        showList.includes(index)
                                            ? "show"
                                            : "hide"
                                    )}
                                >
                                    {item.list.map((itemChildren, index) => (
                                        <div
                                            key={index}
                                            className={cx("list-item")}
                                        >
                                            <Link
                                                className={cx("link")}
                                                to={itemChildren.to}
                                            >
                                                {itemChildren.title}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx("row", "footer-container")}>
                        <div
                            className={cx("col-12 col-xxl-3 col-xl-3 col-lg-3")}
                        >
                            <h3
                                className={cx(
                                    "footer-list_header",
                                    "item-mobile"
                                )}
                            >
                                ANANAS SOCIAL
                            </h3>

                            <div className={cx("list", "item-mobile")}>
                                {socials.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={cx("social")}
                                        >
                                            <a
                                                className={cx("link")}
                                                href={social.link}
                                            >
                                                <Icon
                                                    className={cx(
                                                        "social-icon"
                                                    )}
                                                ></Icon>
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            className={cx("col-12 col-xxl-3 col-xl-3 col-lg-3")}
                        >
                            <h3
                                className={cx(
                                    "footer-list_header",
                                    "item-mobile"
                                )}
                            >
                                ĐĂNG KÍ NHẬN MAIL
                            </h3>
                            <div className={cx("list", "item-mobile")}>
                                <div className={cx("social", "form-group")}>
                                    <input type="text" />
                                    <button>
                                        <ArrowForwardIcon
                                            className={cx("form-icon")}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={cx("col-6")}>
                            <img src={brandImg} alt="" />
                        </div>
                    </div>
                    <div className={cx("row", "footer-container")}>
                        <div
                            className={cx("col-12 col-xxl-3 col-xl-3 col-lg-3")}
                        >
                            <img src={licenseImg} alt="license" />
                        </div>
                        <div
                            className={cx(
                                "col-12 col-xxl-9 col-xl-9 col-lg-9",
                                "license"
                            )}
                        >
                            <span>
                                Copyright © 2022 Ananas. All rights reserved.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
