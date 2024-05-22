import styled from "styled-components";
import Map from "./Map";
import Navigation from "@/components/Navigation";
import SideBar from '../components/Sidebar';


export default function Home() {

  return (
    <Container>
      <header>
        <h1>제목: 지역별 매물</h1>
      </header>
      <nav>
        <Navigation/>
      </nav>
      <div className="body">
        <aside>
        <SideBar/>
        </aside>
        <article>
          <Map/>
        </article>
      </div>
      <footer>
        <h1>하단</h1>
      </footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: gray;
  position: relative;
  header {
    width: calc(100% - 100px);
    padding: 30px 50px;
    background-color: #bd5757;
    position: absolute;
    font-size: 15px;
  }
  nav {
    width: calc(100% - 100px);
    padding: 10px 50px;
    background-color: #873737;
    position: absolute;
    top: 100px;
    font-size: 13px;
  }
  .body {
    display: flex;
    flex-direction: row;
    background-color: #e9e94b;
    width: 100%;
    position: relative;
    top: 135px;
    aside {
      display: flex;
      flex-direction: column;
      width: calc(20% - 100px);
      height: 90%;
      padding: 50px;
      /* background-color: #008000c0; */
      position: absolute;
      left: 0px;
    }
    article {
      width: 100%;
      background-color: #cf8c8c;
      overflow: hidden;
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    background-color: gray;
    width: calc(100% - 80px);
    height: auto;
    padding: 40px;
    position: absolute;
    top: calc(100% + 130px);
    font-size: 15px;
  }
`