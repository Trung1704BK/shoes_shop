import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import config from "../../../../config";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import imageDiscoverYou from "../../../../asset/icon/DiscoverYOU.svg";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Menu from "../Menu/Menu";

import * as categoryService from "../../../../service/categoryService";

import menuNamImg from "../../../../asset/images/menu/Menu_Nam.jpg";
import menuNuImg from "../../../../asset/images/menu/Menu_Nu.jpg";
import menuPhuKienImg from "../../../../asset/images/menu/Menu_Phu-kien.jpg";
import menuSaleImg from "../../../../asset/images/menu/Menu_Sale-off.jpg";
import Brand from "./Brand/Brand";
import { useDispatch } from "react-redux";
import {
    addProductFilter,
    addSearch,
    addDropdownHideShow,
    addGender,
} from "../../../../redux/slice/globalSlice";

const cx = classNames.bind(styles);
function Navbar() {
    let id = 0;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showDropMenu, setShowDropMenu] = useState({
        mobile: false,
        desktop: false,
    });
    const [headerTitle, setHeaderTitle] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    //Get category for navbar
    const getCategory = async () => {
        try {
            const res = await categoryService.getCategory();
            setCategorys(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const childData = [
        {
            id: id++,
            title: "NỔI BẬT",
            children: {
                data: [
                    {
                        id: id++,
                        titleHeaderList: "Sale off",
                        children: {
                            data: categorys
                                .filter((item) => {
                                    if (item.fk_category_group_id === 1) {
                                        return true;
                                    }
                                })
                                .slice(0, 5),
                        },
                    },
                    {
                        titleHeaderList: "Bộ sản phẩm",
                        children: {
                            id: id++,
                            data: categorys
                                .filter((item) => {
                                    if (item.fk_category_group_id === 4) {
                                        return true;
                                    }
                                })
                                .slice(0, 5),
                        },
                    },
                ],
            },
        },
        {
            id: id++,
            title: "GIÀY",
            children: {
                data: [
                    {
                        id: id++,
                        titleHeaderList: "Dòng sản phẩm",
                        children: {
                            data: categorys
                                .filter((item) => {
                                    if (item.fk_category_group_id === 3) {
                                        return true;
                                    }
                                })
                                .slice(0, 5),
                        },
                    },
                    {
                        titleHeaderList: "Style",
                        children: {
                            id: id++,
                            data: categorys
                                .filter((item) => {
                                    if (item.fk_category_group_id === 2) {
                                        return true;
                                    }
                                })
                                .slice(0, 5),
                        },
                    },
                ],
            },
        },
        {
            id: id++,
            title: "THỜI TRANG VÀ PHỤ KIỆN",
            children: {
                data: [
                    {
                        id: id++,
                        titleHeaderList: "Nửa trên",
                        children: {
                            data: [
                                {
                                    id: id++,
                                    title: "Basic Tee",
                                },
                                {
                                    id: id++,
                                    title: "Graphic Tee",
                                },
                                {
                                    id: id++,
                                    title: "Sweatshirt ",
                                },
                                {
                                    id: id++,
                                    title: "Hoodie ",
                                },
                            ],
                        },
                    },
                    {
                        titleHeaderList: "Phụ kiện",
                        children: {
                            data: [
                                {
                                    id: id++,
                                    title: "Nón",
                                },
                                {
                                    id: id++,
                                    title: "Dây giày",
                                },
                                {
                                    id: id++,
                                    title: "Vớ",
                                },
                                {
                                    id: id++,
                                    title: "Ba lô & Túi",
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ];

    const navList = [
        {
            id: id++,
            title: "SẢN PHẨM",
            gender: "",
            children: {
                data: [
                    {
                        id: id++,
                        image: menuNamImg,
                        title: "CHO NAM",
                    },
                    {
                        id: id++,
                        image: menuNuImg,
                        title: "CHO NỮ",
                    },
                    {
                        id: id++,
                        image: menuPhuKienImg,
                        title: "OUTLET SALE",
                    },
                    {
                        id: id++,
                        image: menuSaleImg,
                        title: "THỜI TRANG PHỤ KIỆN",
                    },
                ],
            },
        },

        {
            id: id++,
            title: "NAM",
            gender: "male",
            children: {
                data: [...childData],
            },
        },

        {
            id: id++,
            title: "NỮ",
            gender: "female",
            children: {
                data: [...childData],
            },
        },

        {
            id: 318,
            title: "SALE OFF",
            fk_category_group_id: 1,
        },
        {
            id: id++,
            title: "DiscoverYOU",
        },
    ];

    //History is the all menu
    const [history, setHistory] = useState([{ title: "", data: navList }]);
    //Current menu
    const currentMenu = history[history.length - 1];

    const onMenuClick = () => {
        setShowDropMenu({ ...showDropMenu, mobile: !showDropMenu.mobile });
        if (!showDropMenu.mobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            setHistory([{ title: "", data: navList }]);
        }
    };

    const handleShowMenu = () => {
        onMenuClick();
    };

    const handleAddChildMenu = (item) => {
        //Open children menu when is mobile
        if (window.innerWidth < 992) {
            //Add child if have
            if (item.children && !item.titleHeaderList) {
                setHistory([
                    ...history,
                    { data: item.children.data, title: item.title },
                ]);
                setHeaderTitle([...headerTitle, item.title]);
            }
            //navigate page when not have child
            else {
                dispatch(addProductFilter(item));
                navigate(config.routes.product);
                onMenuClick();
            }
        } else if (item.gender) {
            dispatch(addGender(item.gender));
        } else if (item.fk_category_group_id) {
            dispatch(addProductFilter(item));
        }
        navigate(config.routes.product);
    };

    //Handle back menu
    const handleBackMenu = () => {
        //Slice menu
        setHistory((preHistory) => preHistory.slice(0, preHistory.length - 1));
        //Slice header menu
        setHeaderTitle((preHeaderTitle) =>
            preHeaderTitle.slice(0, preHeaderTitle.length - 1)
        );
    };

    //Handle search
    const onSearchClick = () => {
        dispatch(addSearch(searchKey));
        navigate(config.routes.search);
    };

    const detectResize = () => {
        if (window.innerWidth >= 992) {
            setHistory((preHistory) => preHistory.slice(0, 1));
        }
    };

    useEffect(() => {
        window.addEventListener("resize", detectResize);
        return () => {
            window.removeEventListener("resize", detectResize);
        };
    }, []);

    useEffect(() => {
        setHistory([{ title: "", data: navList }]);
    }, [categorys]);

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className={cx("container-fluid px-0", "wrapper")}>
            <div className={cx("row gx-0", "navbar")}>
                {/* Logo */}
                <Brand></Brand>
                {/* Navbar navigation */}
                <div
                    className={cx("col-xl-8 col-lg-10", "navbar-nav", {
                        show: showDropMenu.mobile,
                    })}
                >
                    <ul className={cx("nav-list")}>
                        {history.length > 1 && (
                            <li className={cx("dropdown", "dropdown-mobile")}>
                                {/* Header menu mobile */}
                                <div
                                    onClick={handleBackMenu}
                                    className={cx(
                                        "dropdown-link",
                                        "dropdown-link_mobile"
                                    )}
                                >
                                    <KeyboardArrowDownIcon
                                        className={cx("header-mobile_icon")}
                                    />
                                    <div className={cx("header-mobile_title")}>
                                        {history.map((item, index) => (
                                            <span key={index}>
                                                {item.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        )}
                        {currentMenu.data.map((item, index) => {
                            return (
                                <li key={index}>
                                    {/* List item  */}
                                    <div
                                        key={index}
                                        className={cx("dropdown")}
                                        onClick={() => handleAddChildMenu(item)}
                                    >
                                        <div className={cx("dropdown-link")}>
                                            {/* Header title menu mobile */}
                                            {item.titleHeaderList && (
                                                <span
                                                    className={cx(
                                                        "dropdown-title",
                                                        "title-mobile_header-list"
                                                    )}
                                                >
                                                    {item.titleHeaderList}
                                                </span>
                                            )}
                                            {/* List title menu mobile and desktop */}
                                            {index <
                                                currentMenu.data.length - 1 && (
                                                <span
                                                    className={cx(
                                                        "dropdown-title"
                                                    )}
                                                >
                                                    {item.title ||
                                                        item.category_title}
                                                </span>
                                            )}

                                            {/* Change image to text */}
                                            {index ===
                                                currentMenu.data.length - 1 && (
                                                <>
                                                    <span
                                                        className={cx(
                                                            "d-block d-xxl-none d-xl-none d-lg-none",
                                                            "dropdown-title",
                                                            "title-hide"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </span>
                                                    <img
                                                        className={cx(
                                                            "d-none d-xxl-block d-xl-block d-lg-block",
                                                            "dropdown-image"
                                                        )}
                                                        src={imageDiscoverYou}
                                                        alt=""
                                                    />
                                                </>
                                            )}
                                            {/* If have child will show arrow icon */}
                                            {item.children &&
                                                !item.titleHeaderList && (
                                                    <>
                                                        <KeyboardArrowDownIcon
                                                            className={cx(
                                                                "dropdown-icon"
                                                            )}
                                                        />
                                                        <div
                                                            className={cx(
                                                                "arrow"
                                                            )}
                                                        ></div>
                                                    </>
                                                )}
                                            {/* Last position of navList */}
                                        </div>
                                        {/* For pc */}
                                        {index === 0 && (
                                            <DropDownMenu
                                                menu1
                                                className={cx("dropdown-menu", {
                                                    open: showDropMenu.desktop,
                                                })}
                                                data={navList}
                                            />
                                        )}
                                        {index > 0 && index < 3 && (
                                            <DropDownMenu
                                                className={cx("dropdown-menu", {
                                                    open: showDropMenu.desktop,
                                                })}
                                                data={navList}
                                            />
                                        )}
                                    </div>
                                    {/* Last list item */}
                                    {item.titleHeaderList &&
                                        item.children.data.map(
                                            (itemChild, index) => (
                                                <div
                                                    key={index}
                                                    className={cx("dropdown")}
                                                    onClick={() =>
                                                        handleAddChildMenu(
                                                            itemChild
                                                        )
                                                    }
                                                >
                                                    <div
                                                        className={cx(
                                                            "dropdown-link"
                                                        )}
                                                    >
                                                        <span
                                                            key={index}
                                                            className={cx(
                                                                "dropdown-title"
                                                            )}
                                                        >
                                                            {itemChild.category_title ||
                                                                itemChild.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </li>
                            );
                        })}
                    </ul>

                    <Menu className={cx("menu-mobile")} onClick={onMenuClick} />
                    <div className={cx("white-line-mobile")}></div>
                    <div className={cx("menu_description-mobile")}>
                        <span className={cx("description")}>
                            MỌI NGƯỜI THƯỜNG GỌI CHÚNG TÔI LÀ <span>DỨA</span> !
                        </span>
                    </div>
                </div>

                <div
                    className={cx(
                        "col-8 col-xl-3 col-lg-12 col-md-8 col-sm-8",
                        "navbar-search"
                    )}
                >
                    <div className={cx("form-control")}>
                        <div className={cx("icon")} onClick={onSearchClick}>
                            <SearchIcon className={cx("icon-search")} />
                        </div>
                        <input
                            className={cx("search-input")}
                            type="text"
                            placeholder="Tìm kiếm "
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    onClick={handleShowMenu}
                    className={cx(
                        "d-block d-lg-none d-flex justify-content-center",
                        "col-2 col-md-2 col-sm-2"
                    )}
                >
                    <MenuIcon className={cx("menu-icon")} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
