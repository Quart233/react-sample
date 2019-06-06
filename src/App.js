import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Index from './header/header'
import LikeButton from './like/like'
import CommentApp from './comments/comment'
import Lifecircle from './lifecircle/lifecircle'
import Clock from './clock/clock'

function App() {
  return (
    <div className="App">
      <Index />
      <hr/>
      <h1>props 配置示例</h1>
      <div>props 配置</div>
      <LikeButton likedText='已赞' unlikedText='赞'/>
      <div>没有 props 配置</div>
      <LikeButton />
      <hr/>
      <h1>评论app</h1>
      <CommentApp />
      <hr/>
      <h1>react 的生命周期</h1>
      <Lifecircle />
      <Clock />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello React</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
