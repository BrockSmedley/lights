import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const SERVER_URL = "http://192.168.0.7"
const logo = "/dong.png"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	    red: false,
	    green: false,
	    blue: false,
	    power: false
    }
    this.onClick = this.onClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  async componentDidMount() {
    let res = await axios.get(`${SERVER_URL}:5000/status`);
    console.log("status: ", res.data);
    let s = res.data;
    await this.setState({
	    power: !Boolean(s[0]),
	    red: !Boolean(s[1]),
	    green: !Boolean(s[2]),
	    blue: !Boolean(s[3])
    });
    await console.log("STATE: ", this.state);
  }
  
  async onClick(e){
    e.persist();
    let res = await axios.get(`${SERVER_URL}:5000/${e.target.id}`);
    console.log("res: ", res);
    if (e.target.id == "kill"){
      this.setState({ 
        red: false, 
        green: false, 
        blue: false, 
        power: false}
      );
    }
    else {
      await this.setState({
        [e.target.id]: !this.state[e.target.id]
      });
    }
    
    await console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
          
          <img src={logo} className={`App-logo ${!this.state.power ? 'meatspin' : ''}`} alt="logo" />
          <p>
            PULL THE FUCKIN TRIGGER BITCH
          </p>
          <div className="status">
            <span>{this.state.red ? "R" : "_"}</span>
            <span>{this.state.green ? "G" : "_"}</span>
            <span>{this.state.blue ? "B" : "_"}</span>
          </div>
          
          <div className="container">
            <button type="button" className="btn btn-danger" id="red" onClick={this.onClick}>Red</button>
            <button type="button" className="btn btn-success" id="green" onClick={this.onClick}>Green</button>
            <button type="button" className="btn btn-primary" id="blue" onClick={this.onClick}>Blue</button>
            <button type="button" className="btn btn-light" id="power" onClick={this.onClick}>Power</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
