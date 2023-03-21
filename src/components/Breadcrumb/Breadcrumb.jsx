import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./Breadcrumb.module.scss";
import { selectBreadCrumb } from "../../redux/selector";
import { addProductFilter } from "../../redux/slice/globalSlice";

const cx = classNames.bind(styles);
function Breadcrumb({ className, children }) {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    //Get breadcrumb from redux
    const breadcrumb = useSelector(selectBreadCrumb);

    //Handle breadcrumb when click
    const onBreadcrumbClick = (item) => {
        if (item?.to) {
            //If have category_line_id will navigator to product with line id
            if (item?.fk_category_line_id) {
                dispatch(
                    addProductFilter({
                        id: item?.fk_category_line_id,
                        breadcrumb: true,
                    })
                );
                navigator(item.to);
            } else {
                navigator(item.to);
            }
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("breadcrumb")}>
                <ul className={cx(className)}>
                    {breadcrumb.length > 1 ? (
                        breadcrumb.map((item, index) => (
                            <li
                                onClick={() => onBreadcrumbClick(item)}
                                key={index}
                            >
                                {item.title?.toLowerCase()}
                            </li>
                        ))
                    ) : (
                        <li>{`${breadcrumb} ${children}`}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default memo(Breadcrumb);
