import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Category from '../components/Category';
import List from '../components/List';

export default function SideBar({ address }) {
    const [isShowCategory, setIsShowCategory] = useState(true);
    const [listInfo, setListInfo] = useState({
        city: address,
        count: 10000,
    });
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
    };

    useEffect(() => {
        (async () => {
            // API 호출
            const result = await fetch('', {});

            const data = await result.json();
            setItems(data);
        })();
    }, []);

    return (
        <Container>
            <div className="sidebar">
                {isShowCategory ? (
                    <CategoryContainer>
                        <Category
                            isShowCategory={isShowCategory}
                            ToggleCategory={ToggleCategory}
                        />
                    </CategoryContainer>
                ) : (
                    <ListContainer>
                        <List
                            listInfo={listInfo}
                            items={items}
                            address={address}
                        />
                    </ListContainer>
                )}
                <div className="category-toggle">
                    <button onClick={ToggleCategory}>{isShowCategory ? "검색" : "다른 카테고리 둘러보기"}</button>
                </div>
            </div>
        </Container>
    );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;

  .sidebar {
    flex: 0.5;
    width: 100%;
    height: 100%;
    overflow: scroll;
    min-width: 220px;
  }

  .category-toggle {
    position: relative;
    padding: 10px;
    text-align: center;
  }

  .category-toggle .toggle-line {
    border: 1px solid lightgrey;
    padding-top: 1rem;
  }

  .category-toggle button {
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 15px;
    padding: 0.5rem 2rem;
    color: grey;
    cursor: pointer;
  }
`;

const CategoryContainer = styled.div`
  animation: ${fadeIn} 0.5s;
`;

const ListContainer = styled.div`
  animation: ${fadeIn} 0.5s;
`;
