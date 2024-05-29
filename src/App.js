import logo from './logo.svg';
import './App.css';
import Top_nav from './component/TopNav/Top_nav';
import Article from './component/Article/Article';

function App() {
  return (
    <div className="App">
      <Top_nav/>
      {/* 본문(사이드바, 지도) */}
      <Article />
    </div>
  );
}

export default App;
