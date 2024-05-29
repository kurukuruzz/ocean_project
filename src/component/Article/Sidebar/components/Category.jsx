import React from "react";
import './Category.css';

const Category = ({
    isShowCategory,

    ToggleCategory,
}) => {
    return (
        <div className="sidebar-category">
            {
                isShowCategory &&
                <div className="category-list">
                    <input type="checkbox" name="20대" id="20s" />
                    <label htmlFor="20s">20대</label>
                    <input type="checkbox" name="30대" id="30s" />
                    <label htmlFor="30s">30대</label>
                    <input type="checkbox" name="40대" id="40s" />
                    <label htmlFor="40s">40대</label>
                    <input type="checkbox" name="50대" id="50s" />
                    <label htmlFor="50s">50대</label>
                </div>
            }
            <div className="category-toggle">
                <div className="toggle-line"></div>
                <button onClick={ToggleCategory}>
                    {
                        isShowCategory ?
                            '△' : '▽'
                    }
                </button>
            </div>
        </div>
    )
}

export default Category;