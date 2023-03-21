import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import * as productService from "../../service/productService";

import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Button from "../../components/Button/Button";
import ImageSlide from "../../components/ImageSlide/ImageSlide";
import Slick from "../../components/Slick/Slick";
import Card from "../../components/Card/Card";
import SelectGrid from "../../components/SelectGrid/SelectGrid";
import PanelGroup from "../../components/PanelGroup/PanelGroup";
import imageSize from "../../asset/images/global/Size-chart-1-e1559209680920.jpg";

import {
    selectProductId,
    selectProductDetail,
    selectWishList,
} from "../../redux/selector";

import {
    addCart,
    addProductDetail,
    addWishList,
} from "../../redux/slice/productSlice";
import {
    policy,
    service,
    colors,
    quantityList,
    sizeList,
} from "../../data/productDetail";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const cx = classNames.bind(styles);
function ProductDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const refItemSlick = useRef(null);
    const productId = useSelector(selectProductId);
    const wishList = useSelector(selectWishList);
    const productDetail = useSelector(selectProductDetail);
    const [showPanel, setShowPanel] = useState();
    const [products, setProducts] = useState([]);
    const [selectGrid, setSelectGrid] = useState({
        size: sizeList[0],
        quantity: quantityList[0],
        color: colors[0].color,
    });
    const [loading, setLoading] = useState({
        productLoading: false,
    });
    const { productLoading } = loading;

    //Product slide
    const getNewProducts = async () => {
        try {
            const productRes = await productService.getNewProduct({
                limit: 8,
                sortBy: "id",
                orderBy: "DESC",
            });
            setProducts(productRes.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading({
                ...loading,
                productLoading: false,
            });
        }
    };

    //Handle get info product detail
    const getProductDetail = async () => {
        const productRes = await productService.getProductDetail({ productId });
        //setProductDetail(productRes?.data[0]);
        dispatch(addProductDetail(productRes?.data[0]));
        window.scrollTo(0, 0);
    };

    //Show panel group
    const handleShowPanel = (value) => {
        if (showPanel === value) {
            setShowPanel(null);
        } else {
            setShowPanel(value);
        }
    };

    //Add wishlist
    const handleAddWishList = (product) => {
        const obj = Object.preventExtensions(product);
        const newObj = {
            ...obj,
            size: selectGrid.size,
            quantity: selectGrid.quantity,
        };
        dispatch(addWishList(newObj));
    };

    //Add cart
    const handleAddCart = (product) => {
        const obj = Object.preventExtensions(product);
        const newObj = {
            ...obj,
            size: selectGrid.size,
            quantity: selectGrid.quantity,
            color: selectGrid.color,
            update: false,
        };
        dispatch(addCart(newObj));
    };

    const handlePayment = (product) => {
        handleAddCart(product);
        navigate(config.routes.cart);
    };

    //Handle set value when grid change
    const handleSelectGirdChange = (name, value) => {
        setSelectGrid({ ...selectGrid, [name]: value });
    };

    //Handle color change
    const handleColorChange = (value) => {
        setSelectGrid({ ...selectGrid, color: value });
    };

    //Function drop line
    function NewlineText(props) {
        const text = props.text;
        return text.split("\n").map((str, index) => <p key={index}>{str}</p>);
    }

    useEffect(() => {
        setLoading({
            ...loading,
            productLoading: true,
        });
        getNewProducts();
    }, []);

    useEffect(() => {
        getProductDetail();
    }, [productId]);

    return (
        <div id="wrapper" className={cx("container-fluid gx-0", "wrapper")}>
            <div className={cx("row gx-0", "detail-container")}>
                <Breadcrumb className={cx("col-12")} />
                <div className={cx("col-12 col-xxl-7 col-xl-7 col-lg-7")}>
                    <ImageSlide className={cx("wrapper-slide")}></ImageSlide>
                </div>

                <div
                    className={cx(
                        "col-12 col-xxl-5 col-xl-5 col-lg-5",
                        "wrapper-detail"
                    )}
                >
                    <h2 className={cx("title-header")}>
                        {`${productDetail?.product_name} - ${productDetail?.categorys_title?.style_title} - ${productDetail?.categorys_title?.material_title}`}
                    </h2>
                    <div className={cx("code")}>
                        <span>
                            Mã sản phẩm: <strong>AV00183</strong>
                        </span>
                        <span>
                            Tình trạng:{" "}
                            <strong>
                                {productDetail?.categorys_title?.status_title}
                            </strong>
                        </span>
                    </div>
                    <h3 className={cx("price")}>
                        {productDetail?.product_price?.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </h3>
                    <div className={cx("line-dashed")}></div>
                    <div className={cx("color")}>
                        {colors.map((colorItem, index) => (
                            <span
                                key={index}
                                style={{ backgroundColor: colorItem.color }}
                                className={cx("color-item", {
                                    "color-active":
                                        selectGrid.color === colorItem.color,
                                })}
                                onClick={() =>
                                    handleColorChange(colorItem.color)
                                }
                            ></span>
                        ))}
                    </div>
                    <div className={cx("line-dashed")}></div>
                    <div className={cx("row gx-0", "info")}>
                        <div
                            className={cx(
                                "col-6 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6",
                                "size",
                                "btn-block"
                            )}
                        >
                            <h3>SIZE</h3>
                            <SelectGrid
                                name="size"
                                dropClick={handleSelectGirdChange}
                                data={sizeList}
                                currentValue={selectGrid.size}
                            ></SelectGrid>
                        </div>
                        <div
                            className={cx(
                                "col-6 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6",
                                "quality",
                                "btn-block"
                            )}
                        >
                            <h3>SỐ LƯỢNG</h3>
                            <SelectGrid
                                name="quantity"
                                dropClick={handleSelectGirdChange}
                                data={quantityList}
                                currentValue={selectGrid.quantity}
                            ></SelectGrid>
                        </div>
                    </div>
                    <div className={cx("row gx-0", "btn-container")}>
                        <div
                            className={cx(
                                "col-9 col-xxl-9 col-xl-9 col-lg-9 col-md-9  col-sm-9",
                                "btn-item"
                            )}
                        >
                            <Button
                                className={cx("btn-add", "black")}
                                onClick={() => handleAddCart(productDetail)}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <div
                            className={cx(
                                "col-3 col-xxl-3 col-xl-3 col-lg-3  col-md-3 col-sm-3",
                                "btn-item"
                            )}
                        >
                            <Button
                                className={cx("btn-add", "black")}
                                onClick={() => handleAddWishList(productDetail)}
                            >
                                {wishList.find(
                                    (item) => item.id === productDetail?.id
                                ) ? (
                                    <FavoriteIcon
                                        className={cx("btn-favorite")}
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        className={cx("btn-favorite")}
                                    />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className={cx("row gx-0", "btn-container")}>
                        <div
                            className={cx(
                                "col-12 col-xxl-12 col-xl-12 col-lg-12",
                                "btn-item"
                            )}
                        >
                            <Button
                                className={cx("btn-add")}
                                onClick={() => handlePayment(productDetail)}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                    <div className={cx("row gx-0", "panel-container")}>
                        <div className={cx("panel-item")}>
                            <PanelGroup
                                header="Thông tin sản phẩm"
                                className={cx("item-panel_header", {
                                    active: showPanel === 1,
                                })}
                                show={showPanel === 1}
                                onClick={() => handleShowPanel(1)}
                                twoline
                            >
                                <div className={cx("panel-content")}>
                                    <span className={cx("title")}>
                                        <span className={cx("hight-light")}>
                                            {`Gender: ${productDetail?.product_sex}`}
                                        </span>{" "}
                                        <br />
                                        Size run: 35 – 46 <br />
                                        <span className={cx("hight-light")}>
                                            {`Material: ${productDetail?.categorys_title?.material_title}`}
                                        </span>{" "}
                                        <br />
                                        Outsole: Rubber <br />
                                        Có thêm 01 bộ dây đi kèm <br />
                                        <img src={imageSize} alt="" />
                                    </span>
                                </div>
                            </PanelGroup>
                        </div>
                    </div>

                    <div className={cx("row gx-0", "panel-container")}>
                        <div className={cx("panel-item")}>
                            <PanelGroup
                                header="Quy định đổi sản phẩm"
                                className={cx("item-panel_header", {
                                    active: showPanel === 2,
                                })}
                                show={showPanel === 2}
                                onClick={() => handleShowPanel(2)}
                                twoline
                            >
                                <div className={cx("panel-content")}>
                                    <ul>
                                        {policy.map((item, index) => (
                                            <li key={index}>
                                                <span className={cx("title")}>
                                                    <NewlineText
                                                        text={item.title}
                                                    />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </PanelGroup>
                        </div>
                    </div>

                    <div className={cx("row gx-0", "panel-container")}>
                        <div className={cx("panel-item")}>
                            <PanelGroup
                                header="Bảo hành thế nào ?"
                                className={cx("item-panel_header", {
                                    active: showPanel === 3,
                                })}
                                show={showPanel === 3}
                                onClick={() => handleShowPanel(3)}
                                twoline
                            >
                                <div className={cx("panel-content")}>
                                    {service.map((item, index) => (
                                        <p className={cx("title")} key={index}>
                                            {item.title}
                                        </p>
                                    ))}
                                </div>
                            </PanelGroup>
                        </div>
                    </div>
                </div>

                <section>
                    <div className={cx("section-title")}>
                        <h2>
                            <span>SẢN PHẨM MỚI</span>
                        </h2>
                    </div>

                    {!productLoading ? (
                        <Slick className={cx("slick")}>
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    ref={refItemSlick}
                                    className={cx(
                                        "col-6 col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-4",
                                        "slick-item"
                                    )}
                                >
                                    <Card data={product} cardSlick></Card>
                                </div>
                            ))}
                        </Slick>
                    ) : (
                        <div style={{ margin: "auto" }}>
                            <Loading className={cx("loading")}></Loading>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ProductDetail;
