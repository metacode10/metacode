import { useCallback, useState } from 'react';
import './App.css';

function App() {

  const [title,setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  const [count,setCount] = useState(0);


  return (
    <div className="App">
      <div className="black-nav">
        <h4>ret</h4>
      </div>
      <div>
        <button onClick={()=>{
          const newTitle = [...title];
          newTitle[0] = '홍길동 코드 이벤트';
          setTitle(newTitle);
        }}>changText</button>
      </div>
      <div className="list">
        <h4>
          {title[0]} <span onClick={()=>{setCount(count+1)}}>👍</span><span>{count}</span>
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <Detail />
      <Detail />
      <Detail />
      <Detail />
      <Detail />                    
    </div>
  );
}

function Detail(){
  return (
    <div className="modal">
    <h2>제목</h2>
    <p>날짜</p>
    <p>상세내용</p>
  </div>
  );
}

export default App;
