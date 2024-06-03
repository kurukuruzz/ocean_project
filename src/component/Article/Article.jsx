import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Map from "./Map/Map";

import './Article.css';

const Article = () => {
    const [address, setAddress] = useState('');
    return (
        <div className="article">
            <Sidebar
                address={address}
            />
            <Map
                setAddress={setAddress}
            />
        </div>
    )
}

export default Article;