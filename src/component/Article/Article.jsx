import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Map from "./Map/Map";

import './Article.css';

const Article = () => {
    return (
        <div className="article">
            <Sidebar />
            <Map />
        </div>
    )
}

export default Article;