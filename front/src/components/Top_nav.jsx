import React from 'react';
import styled from "styled-components";

export default function Top_nav() {
  return (
    <Container>
      <div className="top_nav">
          <div className="logo">
              <img src="https://cdn-icons-png.flaticon.com/128/269/269947.png" alt="img" />
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

.top_nav {
  background-color: white;
  width: 100%;
  height: 100%;
}

.top_nav .logo img {
  width: 50px;
}

.top_nav {
  background-color: #fff;
  border-bottom: 1.5px solid #ebebeb;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.top_nav .logo,
.top_nav .buttons {
  flex: 1;
}

.top_nav .nav-input {
  flex: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;

  position: relative;
  /* border: 1px solid grey; */
  border-radius: 25px;
  margin: 0 10rem;
  padding: 0 1.5rem;
  /*
      padding: 내 안에 여백을 만든다
      margin: 내 밖에 여백을 만든다
  */
}

.top_nav .nav-input input {
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  border-color: transparent;
  background-color: #eaeaea;
  font-size: 14pt;
}

.top_nav .nav-input .search-icon {
  float: right;
  word-break: keep-all;
}

.top_nav .buttons {
  display: flex;
  gap: 0.5rem;
  padding-right: 2rem;
  word-break: keep-all;
}

.top_nav .nav-input input:focus,
.top_nav .buttons button:focus {
  outline: 0;
}`