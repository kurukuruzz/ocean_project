import styled from "styled-components";

export default function Category({ isShowCategory, ToggleCategory }) {
  return (
    <Container>
      <div className="sidebar-category">
        <>
          <div className="category-list">
            <div className="category-divide">카테고리</div>
            <div className="category-select">
              <input type="checkbox" name="IT" id="IT" />
              <label htmlFor="IT">IT</label>
              <input type="checkbox" name="경제" id="economy" />
              <label htmlFor="economy">경제</label>
            </div>
          </div>
          <div className="category-list">
            <div className="category-divide">지역별</div>
            <div className="category-select">
              <input type="checkbox" name="Seoul" id="Seoul" />
              <label htmlFor="Seoul">서울특별시</label>
              <input type="checkbox" name="Gyeonggi" id="Gyeonggi" />
              <label htmlFor="Gyeonggi">경기도</label>
              <br></br>
              <input type="checkbox" name="Incheon" id="Incheon" />
              <label htmlFor="Incheon">인천광역시</label>
              <input type="checkbox" name="Busan" id="Busan" />
              <label htmlFor="Busan">부산광역시</label>
              <input type="checkbox" name="Gangwon" id="Gangwon" />
              <label htmlFor="Gangwon">강원도</label>
              <input type="checkbox" name="ChungBuk" id="Chungbuk" />
              <label htmlFor="Chungbuk">충청북도</label>
              <br></br>
              <input type="checkbox" name="ChungNam" id="ChungNam" />
              <label htmlFor="ChungNam">충청남도</label>
              <input type="checkbox" name="Daejeon" id="Daejeon" />
              <label htmlFor="Daejeon">대전광역시</label>
              <br></br>
              <input type="checkbox" name="Sejong" id="Sejong" />
              <label htmlFor="Sejong">세종시</label>
              <input type="checkbox" name="Gyeongbuk" id="Gyeongbuk" />
              <label htmlFor="Gyeongbuk">경상북도</label>
              <br></br>
              <input type="checkbox" name="Ulsan" id="Ulsan" />
              <label htmlFor="Ulsan">울산광역시</label>
              <input type="checkbox" name="Daegu" id="Daegu" />
              <label htmlFor="Daegu">대구광역시</label>
              <br></br>
              <input type="checkbox" name="Gyeongnam" id="Gyeongnam" />
              <label htmlFor="Gyeongnam">경상남도</label>
              <input type="checkbox" name="Jeonbuk" id="Jeonbuk" />
              <label htmlFor="Jeonbuk">전라북도</label>
              <br></br>
              <input type="checkbox" name="Jeonnam" id="Jeonnam" />
              <label htmlFor="Jeonnamr">전라남도</label>
              <input type="checkbox" name="Gwangju" id="Gwangju" />
              <label htmlFor="Gwangju">광주광역시</label>
              <br></br>
              <input type="checkbox" name="Jeju" id="Jeju" />
              <label htmlFor="Jeju">제주도</label>
            </div>
          </div>
        </>
        <div className="category-toggle">
          <div className="toggle-line"></div>
          <button onClick={ToggleCategory}>{isShowCategory ? "△" : "▽"}</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  .sidebar-category {
    width: 100%;
  }

  .sidebar-category .category-list {
    padding: 0.5rem 0;
    border-bottom: 1px dashed grey;
  }

  .sidebar-category .category-toggle {
    position: relative;
  }

  .sidebar-category .category-toggle .toggle-line {
    border: 1px solid lightgrey;
    padding-top: 1rem;
  }

  .sidebar-category .category-toggle button {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 15px;
    padding: 0.5rem 2rem;
    color: grey;

    cursor: pointer;
  }

  .sidebar-category .category-divide {
    font-weight: bold;
    border-bottom: 1px solid grey;
    padding-bottom: 0.5rem;
  }

  .sidebar-category .category-select {
    padding-top: 0.5rem;
  }
`;
