import React, { useState, useEffect } from "react";
import Category from "./components/Category";
import List from "./components/List";

import './Sidebar.css';

const Sidebar = () => {
    const [isShowCategory, setIsShowCategory] = useState(false);
    const [listInfo, setListInfo] = useState({
        city: '부산광역시',
        count: 10000,
    })
    const [items, setItems] = useState([
        {
            title: 'daf',
            content: 'netrs',
        },
        {
            title: 'daf',
            content: 'netrs',
        },
        {
            title: 'daf',
            content: 'netrs',
        },
    ]);

    const ToggleCategory = () => {
        setIsShowCategory(!isShowCategory);
    }

    useEffect(() => {
        (
            async () => {
                // API 호출
                const result = await fetch('', {

                })

                const data = await result.json();
                setItems(data);
            }
        )()
    }, []);

    return (
        <div className="sidebar">
            <Category
                isShowCategory={isShowCategory}
                ToggleCategory={ToggleCategory}
            />
            <List
                listInfo={listInfo}
                items={items}
            />
        </div>
    )
}

export default Sidebar;