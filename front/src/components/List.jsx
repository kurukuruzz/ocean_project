import React from "react";
import styled from "styled-components";

export default function Top_nav({ listInfo, items, address }) {
  return (
    <Container>
      <div className="sidebar-list">
        <div className="info">
          {address} 핫토픽 ({listInfo.count.toLocaleString()}+곳)
        </div>
        <div className="result-list">
          {items?.map((item) => (
            <div className="list-item">
              <div className="title">{item.title}</div>
              <div className="content">{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  .sidebar-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
    padding: 1rem 0;
  }

  .sidebar-list .info {
    padding: 0.5rem 1rem;
  }

  .sidebar-list .result-list {
    width: 100%;
  }

  .sidebar-list .list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid lightgray;
  }
`;
