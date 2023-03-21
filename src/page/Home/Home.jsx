import { useEffect, useState } from "react";

import * as productService from "../../service/productService";
import Card from "../../components/Card/Card";
import classNames from "classnames/bind";
import SlideImage from "../../components/SlideImage/SlideImage";
import styles from "./Home.module.scss";

import { slideImagesData } from "../../data/home";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);
function Home() {
    const [newProducts, setNewProducts] = useState([]);
    const [oldProducts, setOldProducts] = useState([]);
    const [loading, setLoading] = useState({
        newProductLoading: false,
        oldProductLoading: false,
    });

    const { newProductLoading, oldProductLoading } = loading;

    //Get new product
    const getNewProduct = async () => {
        try {
            const productRes = await productService.getNewProduct({
                limit: 8,
                sortBy: "id",
                orderBy: "DESC",
            });
            setNewProducts(productRes.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading((pre) => ({
                ...pre,
                newProductLoading: false,
            }));
        }
    };

    //Get old product
    const getOldProduct = async () => {
        try {
            const productRes = await productService.getOldProduct({
                limit: 8,
                sortBy: "id",
                orderBy: "ASC",
            });
            setOldProducts(productRes.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading((pre) => ({
                ...pre,
                oldProductLoading: false,
            }));
        }
    };

    //Fetch product
    useEffect(() => {
        setLoading({
            newProductLoading: true,
            oldProductLoading: true,
        });
        getNewProduct();
        getOldProduct();
    }, []);

    return (
        <>
            <SlideImage timeSlide={30000}>
                {slideImagesData.map((slide, index) => (
                    <img
                        key={index}
                        className={cx("slide-image")}
                        src={slide.image}
                        alt="slide"
                    ></img>
                ))}
            </SlideImage>

            <div id="wrapper" className={cx("container-fluid gx-0", "wrapper")}>
                <section>
                    <div className={cx("section-title")}>
                        <h2>
                            <span>SẢN PHẨM MỚI</span>
                        </h2>
                    </div>
                    <div className={cx("product")}>
                        {!newProductLoading ? (
                            <div className={cx("row gx-0", "product-grids")}>
                                {newProducts.map((product, index) => (
                                    <Card
                                        key={product.id}
                                        data={product}
                                        className={cx(
                                            "col-6 col-xxl-3 col-xl-3 col-lg-3 col-md-4",
                                            "card-item"
                                        )}
                                    ></Card>
                                ))}
                            </div>
                        ) : (
                            <Loading></Loading>
                        )}
                    </div>
                </section>

                <section>
                    <div className={cx("section-title")}>
                        <h2>
                            <span>SẢN PHẨM NỔI BẬT</span>
                        </h2>
                    </div>
                    <div className={cx("product")}>
                        {!oldProductLoading ? (
                            <div className={cx("row gx-0", "product-grids")}>
                                {oldProducts.map((product, index) => (
                                    <Card
                                        key={product.id}
                                        data={product}
                                        className={cx(
                                            "col-6 col-xxl-3 col-xl-3 col-lg-3 col-md-4",
                                            "card-item"
                                        )}
                                    ></Card>
                                ))}
                            </div>
                        ) : (
                            <Loading></Loading>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
