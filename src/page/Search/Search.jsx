import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import * as productService from "../../service/productService";

import config from "../../config";
import styles from "./Search.module.scss";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { selectSearchKey } from "../../redux/selector";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);
function Search() {
    const navigate = useNavigate();
    const search = useSelector(selectSearchKey);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState({
        productLoading: false,
    });

    const getNewProducts = async () => {
        try {
            const productRes = await productService.getProductFind({
                search,
            });
            setProducts(productRes.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading({ productLoading: false });
        }
    };

    useEffect(() => {
        setLoading({ productLoading: true });
        getNewProducts();
    }, [search]);

    return (
        <div className={cx("container-fluid", "wrapper")}>
            {!loading.productLoading ? (
                <h1>{`TÌM THẤY ${products.length} KẾT QUẢ CHO '${search}'`}</h1>
            ) : (
                <h1>{`ĐANG TÌM KIẾM VỚI KẾT QUẢ '${search}'`}</h1>
            )}
            <div className={cx("black-line")}></div>
            <div className={cx("product")}>
                {!loading.productLoading ? (
                    products.map((product) => (
                        <Card
                            data={product}
                            className={cx(
                                "col-6 col-xxl-4 col-xl-4 col-lg-4 col-md-4",
                                "card-item"
                            )}
                        ></Card>
                    ))
                ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Loading></Loading>
                    </div>
                )}
            </div>

            <Button
                className={cx(
                    "col-6 col-xxl-4 col-xl-5 col-lg-4",
                    "btn-show-more"
                )}
                onClick={() => navigate(config.routes.product)}
            >
                Xem thêm sản phẩm
            </Button>
        </div>
    );
}

export default Search;
