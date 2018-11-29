import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer;
class App extends Component {
  componentDidMount() {
    let ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', 'test.html');
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
      if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
        console.log('数据返回成功');
        console.log(ajaxObj.responseText);
      }
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
