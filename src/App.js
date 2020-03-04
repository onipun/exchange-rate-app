import React from 'react';
import './App.css';
import { Dropdown } from 'semantic-ui-react'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      exchangeFrom: 'myr',
      exchangeTo: 'eur',
      currentRate: 0,
      exchangeRate: 0
    };
  }

  componentDidMount() {
    this.updateData();
  }

  onChangeFrom = (e, data) => {
    console.log(data.value);
    this.setState({
      exchangeFrom: data.value
    });
    this.updateData();
  }

  onChangeTo = (e, data) => {
    console.log(data.value);
    this.setState({
      exchangeTo: data.value
    });    
    this.updateData()
  }

  updateData = () =>{
    const { exchangeFrom, exchangeTo } = this.state;
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
      )}

  render() {
    const { error, isLoaded, exchangeRate, currentRate } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div style={styles.dropdown}>
            <Dropdown
              placeholder='Select Country'
              fluid
              search
              selection
              options={countryOptions}
              onChange={this.onChangeFrom} />
            <br />
            <Dropdown
              placeholder='Select Country'
              fluid
              search
              selection
              options={countryOptions}
              onChange={this.onChangeTo} />
          </div>

          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <p>current latest rate: {currentRate}</p>
          <p>Result: {exchangeRate}</p>
        </div>
      );
    }
  }



}


const styles = {
  dropdown: {
    margin: 20
  }
}

const countryOptions = [
  { key: 'EUR', value: 'EUR', flag: 'ro', text: 'European' },
  { key: 'USD', value: 'USD', flag: 'us', text: 'United State' },
  { key: 'JPY', value: 'JPY', flag: 'an', text: 'Japan' },
  { key: 'MYR', value: 'MYR', flag: 'my', text: 'Malaysia' },
]

export default App;
