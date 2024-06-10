import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Map from "./Map";
import styled from "styled-components";

export default function Article() {
  const [address, setAddress] = useState("");
  return (
    <Container>
      <div className="article">
        <Sidebar address={address} />
        <Map setAddress={setAddress} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  .article {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;
