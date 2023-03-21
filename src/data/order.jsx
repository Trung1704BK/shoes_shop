import momoImg from "../asset/images/global/icon momo-01.svg";
import cashImg from "../asset/images/global/icon_Cash_visa.svg";
import codImg from "../asset/images/global/icon_COD.svg";

export const formInfoData = [
    {
        name: "userName",
        placeholder: "Họ tên",
        warningTitle: "Vui lòng nhập họ tên",
    },
    {
        name: "phoneNumber",
        placeholder: "Số điện thoại",
        warningTitle: "Vui lòng nhập số điện thoại",
    },
    {
        name: "email",
        placeholder: "Email",
        warningTitle: "Vui lòng nhập email",
    },
    {
        name: "address",
        placeholder: "Address",
        warningTitle: "Vui lòng nhập địa chỉ",
    },
];

const paymentShipingTitleData = [
    {
        title: "Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)",
        group: "0",
    },
    {
        title: "Thanh toán trực tiếp khi giao hàng ",
        group: "1",
        image: codImg,
    },
    {
        title: "Thanh toán bằng thẻ quốc tế và nội địa (ATM)",
        group: "1",
        image: cashImg,
    },
    {
        title: "Thanh toán bằng ví MoMo",
        group: "1",
        image: momoImg,
    },
];

let id = 0;
export const paymentShiping = paymentShipingTitleData.reduce(
    (accumulator, currentItem) => {
        accumulator.push({ id: id++, ...currentItem });
        return accumulator;
    },
    []
);

export const inputGroup = [
    {
        id: "customerName",
        placeholder: "Họ tên",
    },
    {
        id: "customerPhone",
        placeholder: "Số điện thoại",
    },
    {
        id: "customerEmail",
        placeholder: "Email",
    },
    {
        id: "customerAddress",
        placeholder: "Địa chỉ",
    },
];
