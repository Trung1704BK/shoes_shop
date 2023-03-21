import { createSlice, current } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        productId: 0,
        productDetail: {},
        cart: [],
        wishList: [],
        breadcrumb: [],
        totalBill: {},
    },
    reducers: {
        addProductId(state, action) {
            state.productId = action.payload;
        },

        addProductDetail(state, action) {
            state.productDetail = action.payload;
        },

        addBreadCrumb(state, action) {
            state.breadcrumb = action.payload;
        },

        addWishList(state, action) {
            if (state.wishList.find((item) => item.id === action.payload.id)) {
                const cvtArr = state.wishList;
                const newArr = cvtArr.filter(
                    (item) => item.id !== action.payload.id
                );
                state.wishList = newArr;
            } else {
                state.wishList.push(action.payload);
            }
        },

        addTotalBill(state, action) {
            // const objPayload = JSON.stringify(action.payload);
            // sessionStorage.setItem("totalBill", objPayload);
            state.totalBill = action.payload;
        },

        updateWishList(state, action) {
            const cvtArr = state.wishList;
            let newArr;
            newArr = cvtArr.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: action.payload.quantity,
                        size: action.payload.size,
                    };
                } else {
                    return item;
                }
            });
            state.wishList = newArr;
        },

        deleteWishList(state, action) {
            const cvtArr = state.wishList;
            let newArr;
            newArr = cvtArr.filter((item) => item.id !== action.payload.id);
            state.wishList = newArr;
        },

        addCart(state, action) {
            if (
                state.cart.find(
                    (item) =>
                        item.id === action.payload.id &&
                        item.size === action.payload.size
                )
            ) {
                const cvtArr = state.cart;
                const newArr = cvtArr.map((product) => {
                    if (product.id === action.payload.id) {
                        return {
                            ...product,
                            quantity:
                                product.quantity + action.payload.quantity,
                            size: action.payload.size,
                            color: action.payload?.color || "",
                        };
                    } else {
                        return product;
                    }
                });
                state.cart = newArr;
            } else {
                state.cart.push(action.payload);
            }
        },

        updateCart(state, action) {
            const cvtArr = state.cart;
            //2 truong hop
            //TH1: cong don khi san pham co size trung
            //TH2: update san pham
            //Thực hiện cộng dồn product khi sản phẩm trùng
            // Nếu payload.size === item.size (đã tồn tại sản phẩm =>  thực hiện cộng dồn)
            // Nếu size !== size payload => trường hợp thay đổi quantity
            //  item.size === action.payload.size kiem tra co trung voi cart da ton tai
            //  item.size !== action.payload.oldSize => neu khong bang (da thay doi size)
            if (
                cvtArr.find(
                    (item) =>
                        item.id === action.payload.id &&
                        item.size === action.payload.size &&
                        item.size !== action.payload.oldSize
                )
            ) {
                const newArr = cvtArr.map((product) => {
                    if (
                        product.id === action.payload.id &&
                        product.size === action.payload.size
                    ) {
                        return {
                            ...product,
                            quantity:
                                product.quantity + action.payload.quantity,
                            size: action.payload.size,
                            color: action.payload.color,
                        };
                    } else {
                        return product;
                    }
                });

                const newArrFilter = newArr.filter((item) => {
                    if (
                        item.id === action.payload.id &&
                        item.size === action.payload.oldSize
                    ) {
                        return false;
                    } else {
                        return true;
                    }
                });

                state.cart = newArrFilter;
            }
            // Thực hiện update sản phẩm
            else {
                const newArr = cvtArr.map((product) => {
                    if (
                        product.id === action.payload.id &&
                        product.size === action.payload.oldSize
                    ) {
                        return {
                            ...product,
                            quantity: action.payload.quantity,
                            size: action.payload.size,
                        };
                    } else {
                        return product;
                    }
                });
                state.cart = newArr;
            }
        },

        deleteCart(state, action) {
            const cvtArr = state.cart;
            const newArr = cvtArr.filter((item) => {
                if (
                    item.id === action.payload.id &&
                    item.size === action.payload.size
                ) {
                    return false;
                } else {
                    return true;
                }
            });
            state.cart = newArr;
        },

        deleteAllCart(state, action) {
            state.cart = [];
        },
    },
});
//Export action
export const {
    addProductId,
    addProductDetail,
    addBreadCrumb,
    addWishList,
    addCart,
    deleteCart,
    updateCart,
    deleteWishList,
    updateWishList,
    deleteAllCart,
    addTotalBill,
} = productSlice.actions;

export default productSlice;
