import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./Order.module.scss";
import Button from "../../components/Button/Button";
import { selectCart, selectTotalBill } from "../../redux/selector";
import { inputGroup } from "../../data/order";
import * as globalService from "../../service/globalService";
import CheckboxCustom from "./CheckboxCustom/CheckboxCustom";
import { paymentShiping } from "../../data/order";
import { Validator } from "../../form/Validator";

const cx = classNames.bind(styles);

function Order() {
    const shiping = 60000;
    const carts = useSelector(selectCart);
    const totalBillOrder = useSelector(selectTotalBill);
    const [totalPay, setTotalPay] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        customerAddress: "",
    });

    const [address, setAddress] = useState({
        provinces: [],
        districts: [],
        wards: [],
    });

    //Validator form user
    Validator({
        form: "#customer-info",
        warningElement: "#warning-message",
        rules: [
            Validator.isPhoneNumber("#customerPhone"),
            Validator.isName("#customerName"),
            Validator.isEmail("#customerEmail"),
        ],
    });

    //Get data address
    const getAddressData = async () => {
        const resLocal = await globalService.getAddress();
        setAddress((prevLocation) => ({
            ...prevLocation,
            provinces: resLocal.data,
        }));
    };

    const onSelectAddressChange = (e) => {
        const aria = e.target.name;
        const filterLocal = address[aria].find(
            (local) => local.codename === e.target.value
        );
        //Set districts
        if (aria === "provinces") {
            setAddress((prevLocation) => ({
                ...prevLocation,
                districts: filterLocal.districts,
                wards: [],
            }));
            //Set set wards
        } else if (aria === "districts") {
            setAddress((prevLocation) => ({
                ...prevLocation,
                wards: filterLocal.wards,
            }));
        }
    };

    useEffect(() => {
        getAddressData();
    }, []);

    useEffect(() => {
        setTotalPay(
            totalBillOrder.totalBill - totalBillOrder.totalDiscount + shiping
        );
    }, [carts]);

    return (
        <div className={cx("container-fluid gx-0", "wrapper")}>
            <div className={cx("row gx-0", "content")}>
                <div
                    className={cx(
                        "col-12 col-xxl-7 col-xl-7 col-lg-7",
                        "left-content"
                    )}
                >
                    <div className={cx("order-title-1")}>
                        Thông tin giao hàng
                    </div>

                    <div className={cx("row gx-0", "form")}>
                        <div
                            className={cx(
                                "col-12 col-xxl-10 col-xl-10 col-lg-10",
                                "form-info"
                            )}
                        >
                            <form action="" id="customer-info">
                                {inputGroup.map((item) => (
                                    <div className={cx("form-group")}>
                                        <input
                                            id={item.id}
                                            type="text"
                                            placeholder={item.placeholder}
                                            name={item.id}
                                        />
                                        <label id="warning-message" />
                                    </div>
                                ))}

                                <div className={cx("form-group")}>
                                    <select
                                        name="provinces"
                                        onChange={(e) =>
                                            onSelectAddressChange(e)
                                        }
                                    >
                                        <option value="">
                                            Tỉnh/ Thành Phố
                                        </option>
                                        {address.provinces.map((province) => (
                                            <option
                                                key={province.code}
                                                value={province.codename}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>

                            <div className={cx("select-flex")}>
                                <div className={cx("form-group", "flex-item")}>
                                    <select
                                        name="districts"
                                        onChange={(e) =>
                                            onSelectAddressChange(e)
                                        }
                                    >
                                        <option value="">Quận/ Huyện</option>
                                        {address.districts.map((province) => (
                                            <option
                                                key={province.code}
                                                value={province.codename}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={cx("form-group", "flex-item")}>
                                    <select
                                        name="wards"
                                        onChange={(e) =>
                                            onSelectAddressChange(e)
                                        }
                                    >
                                        <option value="">Phường/ Xã</option>
                                        {address.wards.map((province) => (
                                            <option
                                                key={province.code}
                                                value={province.codename}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Phương thức giao hàng */}
                    <div className={cx("order-title-1")}>
                        Phương thức giao hàng
                    </div>
                    <div className={cx("row gx-0")}>
                        {paymentShiping.slice(0, 1).map((item) => (
                            <CheckboxCustom
                                data={item}
                                type="checkbox"
                                className={cx(
                                    "col-12 col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8",
                                    "checkbox-item"
                                )}
                            />
                        ))}
                        <div
                            className={cx(
                                "col-12 col-xxl-4 col-xl-4 col-lg-4  col-md-4 col-sm-4",
                                "checkbox-item",
                                "checkbox-title-1"
                            )}
                        >
                            0 VND
                        </div>
                    </div>
                    {/* Phương thức thanh toán */}
                    <div className={cx("order-title-1")}>
                        Phương thức thanh toán
                    </div>
                    <form action="">
                        {paymentShiping
                            .slice(1, paymentShiping.length)
                            .map((item) => (
                                <CheckboxCustom
                                    data={item}
                                    type="radio"
                                    className={cx("checkbox-item")}
                                />
                            ))}
                    </form>
                </div>

                <div
                    className={cx(
                        "col-12 col-xxl-5 col-xl-5 col-lg-5",
                        "right-content"
                    )}
                >
                    <div className={cx("list-group")}>
                        <div className={cx("right-tag-title")}>Đơn hàng</div>
                        <div className={cx("group-1")}>
                            {carts.map((cart) => (
                                <div className={cx("product-item")}>
                                    <div className={cx("group-flex")}>
                                        <h3
                                            className={cx("product-item_name")}
                                        >{`${cart.product_name.toLowerCase()} - ${cart.categorys_title.line_title.toLowerCase()} - ${cart.categorys_title.style_title.toLowerCase()}`}</h3>
                                        <h3
                                            className={cx(
                                                "product-title-small"
                                            )}
                                        >
                                            {cart.product_price.toLocaleString(
                                                "it-IT",
                                                {
                                                    style: "currency",
                                                    currency: "VND",
                                                }
                                            )}
                                        </h3>
                                    </div>
                                    <div className={cx("group-flex")}>
                                        <h3
                                            className={cx(
                                                "product-title-small"
                                            )}
                                        >
                                            {`Size: ${cart.size}`}
                                        </h3>
                                        <h3
                                            className={cx(
                                                "product-title-small"
                                            )}
                                        >
                                            {`x ${cart.quantity}`}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={cx("line-dashed")}></div>
                        <div className={cx("group-2")}>
                            <div className={cx("group-flex")}>
                                <h3>Đơn hàng</h3>
                                <h3>
                                    {totalBillOrder.totalBill.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}
                                </h3>
                            </div>
                            <div className={cx("group-flex")}>
                                <h3>Giảm</h3>
                                <h3 className={cx("product-title-small")}>
                                    {totalBillOrder.totalDiscount.toLocaleString(
                                        "it-IT",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}
                                </h3>
                            </div>
                            <div className={cx("group-flex")}>
                                <h3 className={cx("group-2_black-title")}>
                                    Phí vận chuyển
                                </h3>
                                <h3 className={cx("product-title-small")}>
                                    {shiping.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </h3>
                            </div>
                            <div className={cx("group-flex")}>
                                <h3 className={cx("group-2_black-title")}>
                                    Thanh toán
                                </h3>
                                <h3 className={cx("product-title-small")}>
                                    {totalPay.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </h3>
                            </div>
                        </div>
                        <div className={cx("line-dashed")}></div>

                        <div className={cx("group-3")}>
                            <div className={cx("group-flex")}>
                                <h3 className={cx("group-3-title")}>
                                    Tổng cộng
                                </h3>
                                <h3 className={cx("group-3-title-primary")}>
                                    {totalPay.toLocaleString()}
                                </h3>
                            </div>
                            <Button
                                className={cx("btn-order")}
                                onClick={() => alert("Đặt hàng thành công !")}
                            >
                                Hoàn tất đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
