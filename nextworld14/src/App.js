/* eslint-disable */

import { useState } from 'react';
import './App.css';

function App() {
  const post = '강남 우동 맛집9';
  const [titles, setTitles] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  const [logo, setLogo] = useState('reactBlog');
  const [likes, setLikes] = useState(0);

  const handleTitleChange = () => {
    const newTitles = [...titles];
    newTitles[0] = '여자 코트 추천';
    setTitles(newTitles);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>

      <button onClick={handleTitleChange}>nextBlog</button>

      <div className="list">
        <h4>
          {titles[0]} <span onClick={handleLike}>👍</span> {likes}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{titles[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{titles[2]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <Modal />
      <Modal2 />

      <h4>{post}</h4>
    </div>
  );
}

const Modal2 = () => {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
};

function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
