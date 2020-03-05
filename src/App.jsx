import React from 'react';
import './App.css';
import { DropdownCode } from './Dropdown';
import { exchangeInitial } from './InitialValue';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = exchangeInitial
  }

  componentDidMount() {
    this.updateData();
  }

  onChangeFrom = (e, data) => {
    this.onchange("exchangeFrom", data);

  }

  onChangeTo = (e, data) => {
    this.onchange("exchangeTo", data);
  }

  onchange = (key, data) => {
    console.log(data.value);
    const state = {};
    state[key] = data.value;
    this.setState(state);
    setTimeout(() => {
      this.updateData();
    })
  }

  updateData = () => {
    const { exchangeFrom, exchangeTo } = this.state;
    console.log(`exhange from ${exchangeFrom}, exchange to ${exchangeTo},`, this.state);
    fetch(`http://localhost:8080/exchange/getRate?exchangeFrom=${exchangeFrom}&exchangeTo=${exchangeTo}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            exchangeRate: result.exchangeRate,
            currentRate: result.currentRate
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, exchangeRate, currentRate, exchangeFrom } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div style={styles.display}>
          <div className="App" style={styles.app}>
            <div style={styles.dropdown}>
              <DropdownCode clicked={this.onChangeFrom.bind(this)} placeholder={"choose exchange base code"}></DropdownCode>
            </div>
            <div style={styles.dropdown}>
              <DropdownCode clicked={this.onChangeTo.bind(this)} placeholder={"choose exchange code"}></DropdownCode>
            </div>


            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <p>{exchangeFrom} current latest rate: {currentRate}</p>
            <p>Result: {exchangeRate}</p>
          </div>
        </div>
      );
    }
  }
}


const styles = {
  dropdown: {
    margin: 20
  },
  display: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    height: "100vh"
  },
  app : {
    width: "40%"
  }
}


export default App;
