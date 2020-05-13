import React, { Component } from "react";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <main className="app">
        <WelcomeForm />
      </main>
    );
  }
}

export default App;
