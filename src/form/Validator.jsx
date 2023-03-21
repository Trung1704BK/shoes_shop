//Constructer function
import classNames from "classnames/bind";
import styles from "../page/Order/Order.module.scss";
const cx = classNames.bind(styles);

//B1: Thuc hien lay form chinh
//B2: Truyen rule duoc goi tu ham Validate xuong
//B3: Ham rule duoc truyen se thuc hien return ve selector va ham test()
//B4: Moi khi input blur se thuc hien check
export function Validator(options) {
    //Element form
    const formElement = document.querySelector(options.form);
    //Function when mouse out input
    //Buoc 3: xu ly moi khi element blur ra ngoai
    function validate(inputElement, rule) {
        const errorMessage = rule.test(inputElement.value);
        //Tu input quay ve element cha lay warning element theo nhom
        const warningElement = inputElement.parentElement.querySelector(
            options.warningElement
        );
        if (errorMessage) {
            warningElement.innerText = errorMessage;
            warningElement.classList.add(cx("title-warning"));
            inputElement.classList.add(cx("input-warning"));
        } else {
            warningElement.innerText = "";
            warningElement.classList.remove(cx("title-warning"));
            inputElement.classList.remove(cx("input-warning"));
        }
    }

    if (formElement) {
        //Buoc 2: Lap cac element va ham test
        options.rules.forEach((rule) => {
            //Element input
            const inputElement = formElement.querySelector(rule.selector);
            //Element label message error
            if (inputElement) {
                //If mouse out input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };
            }
        });
    }
}

//Buoc 1
//Empty
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (valueInput) {
            return valueInput.trim() ? undefined : "Vui lòng nhập trường này";
        },
    };
};
//Email
Validator.isEmail = function (selector) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return {
        selector: selector,
        test: function (valueInput) {
            return regexEmail.test(valueInput)
                ? undefined
                : "Vui lòng nhập email";
        },
    };
};
//Name
Validator.isName = function (selector) {
    const regexName =
        /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    return {
        selector: selector,
        test: function (valueInput) {
            return regexName.test(valueInput)
                ? undefined
                : "Vui lòng nhập họ tên";
        },
    };
};
//Phone number
Validator.isPhoneNumber = function (selector) {
    const regexPhone = /^(0|\+84)\d{9}$/;
    return {
        selector: selector,
        test: function (valueInput) {
            return regexPhone.test(valueInput)
                ? undefined
                : "Vui lòng nhập số điện thoại";
        },
    };
};
