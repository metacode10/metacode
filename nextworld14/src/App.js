/* eslint-disable */

import { useState } from 'react';
import './App.css';

function App() {

  let post = '강남 우동 맛집9';
  let [글제목,글제목변경] = useState(['남자 코트 추천','강남 우동 맛집','파이썬독학']);
  let [logo,setLogo] = useState('reacdtBlog');
  let [따봉, 따봉변경] = useState(0);

  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>

      <button onClick={()=>{ 
          let copy = [...글제목];
          copy[0] = '여자 코트 추천';
          console.log(copy == 글제목);
          글제목변경(copy);
         }}>nextBlog</button> 
      <div className="list">
        <h4>{글제목[0]} <span onClick={()=>{ 따봉변경(따봉+1) }}>👍</span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <Modal></Modal>
      <Modal2/>
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
  )
}

function Modal(){
  return (
    <>
      <div className="modal">
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  )
}

export default App;
