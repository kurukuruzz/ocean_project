import React from "react";
import './List.css';

const List = ({
    listInfo,
    items,
}) => {
    return (
        <div className="sidebar-list">
            <div className="info">
                {listInfo.city} 핫토픽 ({listInfo.count.toLocaleString()}+곳)
            </div>
            <div className="result-list">
                {
                    items?.map(item => (
                        <div className="list-item">
                            <div className="title">{item.title}</div>
                            <div className="content">{item.content}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default List;