import { useState } from "react";
import styled from "styled-components";

export default function SideBar() {
  const [toggle, setToggle] = useState(0);

  return (
    <Container>
      {toggle ===  0 ? 
        <div className="none">
          <button onClick={()=> setToggle(1)}>토글 아이콘</button>
        </div> 
      : 
        <div className="toggle">
          <button onClick={()=> setToggle(0)}>사이드 바 내용</button>
        </div>
      }
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  .none {
    width: 100px;
    height: 100px;
    background-color: green;
    z-index: 2;
  }
  .toggle {
    width: 100%;
    height: 100%;
    background-color: #808080af;
    z-index: 2;
  }
`