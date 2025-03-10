import { useState } from 'react';
import './App.css';

function App() {
  const[cct, setCount] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        블로그임
      </div>
      <div className="list">
        <h4>남자 코트 추천</h4>
        <p>2월 17일 발행</p>
        <button onClick={() => {setCount(cct + 1);}}>Change</button>
        <h4>{cct}</h4>
      </div>
    </div>
  );
}

export default App;
