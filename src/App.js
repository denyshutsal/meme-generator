import './App.scss';
import Header from './components/Header';
import Meme from './components/Meme';

function App() {
  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="meme-container">
        <Meme />
      </div>
    </>
  );
}

export default App;
