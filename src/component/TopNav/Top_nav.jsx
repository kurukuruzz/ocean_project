import React from "react";
import './Top_nav.css';

const Top_nav = () => {
    return (
        <div className="top_nav">
            <div className="logo">
                <img src="/logo.png" alt="img" />
            </div>
            <div className="nav-input">
                <input type="text" placeholder="검색어를 입력하세요" />
                <span className="search-icon">돋보기</span>
            </div>
            <div className="buttons">
                <div>로그인</div>
                <div>회원가입</div>
            </div>
        </div>
    )
}

export default Top_nav;