import './App.css';
iimport React, { useState } from 'react';

function App() {
  let post = '강남 우동 맛집';
  let [ctt, setChange] = useState('남자 코트 추천');

  const handleChange = () => {
    setChange(ctt + ' 코트 추천');
  };

  return (
    <div className="App">
      <div className="black-nav">
        블로그임
      </div>
      <div className="list">
        <h4>{ctt}</h4>
        <p>2월 17일 발행</p>
        <button onClick={handleChange}>Change</button>
h4>{post}</h4>
    <      <div className="black-nav">
        블로그임
      </div>
      <div className="list">
        <h4>{ctt}</h4>
        <p>2월 17일 발행</p>
        <button onClick={handleChange}>Change</button>
      </div>
      <h4>{post}</h4>/div>
  );
}

export default App;
