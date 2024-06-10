import styled from "styled-components";
import Navigation from "@/components/Navigation";
import SideBar from '../components/Sidebar';
import Top_nav from '../components/Top_nav';
import Article from '../components/Article';

export default function Home() {

  return (
    <Container>
      <header>
        <Top_nav/>
      </header>
      <div className="body">
        <Article/>
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
  position: relative;
  header {
    width: calc(100% - 100px);
    padding: 30px 50px;
    background-color: #fff;
    position: absolute;
    font-size: 15px;
  }
  .body {
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
    top: 135px;
  }
  footer {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: calc(100% - 80px);
    height: auto;
    padding: 40px;
    position: absolute;
    top: calc(100% + 130px);
    font-size: 15px;
    border-top: 1px solid #ebebeb;
    margin-top: 20px; 
  }
`