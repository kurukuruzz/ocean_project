import { useState, useEffect } from "react";
import styled from "styled-components";
import Category from '../components/Category';
import List from '../components/List';


export default function SideBar({address}) {
  const [toggle, setToggle] = useState(0);
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [listInfo, setListInfo] = useState({
      city: address,
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
    <Container>
        <div className="sidebar">
            <Category
                isShowCategory={isShowCategory}
                ToggleCategory={ToggleCategory}
            />
            <List
                listInfo={listInfo}
                items={items}
                address={address}
            />
        </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
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
  .sidebar {
    flex: 0.5;
    width: 100%;
    height: 100%;
    overflow: scroll;
    min-width: 220px;
  }
`