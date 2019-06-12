import React from 'react';
import styled from 'styled-components';
import BgImage from './images/bg.jpeg';
import LoadingBar from './components/LoadingBar';
import ProgressBar from './components/ProgressBar';
import config from './config';


class App extends React.Component {

  state = {
    totalAmount: 0,
    donorsCount: 0,
    isLoading: true,
    isEnabled: true,
    progress: "0",
    donationAmount: ''
  }

  componentDidMount() {

    this.setState({ isLoading: true })
    console.log('Fetching');
    this.getStats();

  }

  getStats = () => {
    fetch(config.fetchUrl, {
      method: 'GET',
      key: config.apiKey
    }).then(response => response.json())
      .then(result => {
        console.log(result.values);
        this.setState({
          isLoading: false,
          totalAmount: result.values[0][0],
          donorsCount: result.values[0][1],
          progress: this.getProgress(result.values[0][0])
        })
      })
      .catch(error => console.log(error));
  }

  getProgress = (amount) => {
    const maxDonation = 1000;
    const percentage = Math.min(Math.floor((Number(amount) / maxDonation) * 100), 100);
    if (percentage >= 100) this.setState({ isEnabled: false });
    console.log(percentage);
    return String(percentage) + "%";
  }

  donate = (amount) => {

    if (!this.state.isEnabled) return false;
    if (this.state.donationAmount <= 0) return;

    this.setState({ isLoading: true });



    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(({ country }) => {
        const url = ''+config.formPostUrl+config.amountField+'='+this.state.donationAmount+'&'+config.countryField+'='+country;
        fetch(url, {
          method: 'GET',
         
        })
          .then(response => {
            console.log('Success');
            this.setState({ donationAmount: ''});
            this.getStats();
          }).catch(error => {
            console.log('Failed to post to Sheets');
            console.log(error);
            this.getStats();
          });
      }).catch(error => {
        console.log('Failed to load country name');
        console.log(error);
        this.getStats();
      });

  }

  handleInput = (e) => {
    const value = e.target.value;
    const pattern = new RegExp('^[0-9]*$');

    if (pattern.test(value)) {
      console.log('Test passed')
      this.setState({ donationAmount: value })
    } else {
      this.setState({ donationAmount: this.state.donationAmount })
    }
  }



  render() {
    return (
      <Layout>
        <BgHero />
        <Card>
          <ProgressBar width={this.state.progress}>
            <div><p>{`$${this.state.totalAmount}/$1000`} </p></div>
          </ProgressBar>
          <img src={BgImage} />
          {
            this.state.isLoading ? <PaddedView><LoadingBar /></PaddedView> :
              <>
                <p>Join {this.state.donorsCount} other donors who have already helped this project. Each dollar matters!</p>

                <DonateLayout enabled={this.state.isEnabled}>
                  <input
                    placeholder="$"
                    onChange={this.handleInput}
                    value={this.state.donationAmount}>
                  </input>
                  <button onClick={() => {
                    this.donate(this.state.donationAmount)
                  }}>Donate</button>

                </DonateLayout>
              </>
          }
        </Card>
      </Layout>
    );
  }

}

const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaddedView = styled.div`
  padding: 30px;
`;
const BgHero = styled.div`
  top: 0;
  position: absolute;
  width: 100%;
  height: 300px;
  background-color: #166cf7;
`;

const Card = styled.div`
  position: relative;
  z-index: 99;
  width: 90%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  p {
    padding: 10px 25px 10px 25px;
    font-size: 1.2em;
    line-height: 1.5em;
  }


`;

const DonateLayout = styled.div`
  display: flex;
  padding: 0px 25px 20px 25px;
  justify-content: center;

  input {
    border: 1px solid #cfcfcf;
    border-radius: 10px 0px 0px 10px;
    padding: 15px;
    font-weight: bold;
    font-size: 1.3em;
    max-width: 200px;
    width: 80%;
  }

  button {
    background-color: ${ props => props.enabled ? '#02d140' : '#c0c0c0'};
    border: 0;
    border-radius: 0px 10px 10px 0px;
    padding: 15px 25px 15px 25px;
    color: #ffffff;
    transition: 0.5s all ease-in-out;

    &:hover {
      cursor: ${ props => props.enabled ? 'pointer' : 'not-allowed'};
      background-color: ${ props => props.enabled ? '#028e2d' : ''}
    }
  }
`;

export default App;
