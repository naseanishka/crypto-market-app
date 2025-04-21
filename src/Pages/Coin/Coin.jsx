import React, { useState, useEffect } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
// useParams is a React Router hook that helps you get the values from the URL.
import { CoinContext } from '../../Context/CoinContext'
import { useContext } from 'react'
import LineChart from '../../Components/LineChart/LineChart'

const Coin = () => {


  const { coinId } = useParams();
  const [ coinData, setCoinData ] = useState()
  const { currency } = useContext(CoinContext);
  const [ historicalData, setHistoricalData ] = useState();

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Z8hQwhCjait6JYrZMDCTXJpk'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => setCoinData(res))
      .catch(err => console.error(err));

  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Z8hQwhCjait6JYrZMDCTXJpk'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      // .then(res => console.log(res))
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData()
    fetchHistoricalData()
  }, [currency])



  if(coinData && historicalData) {
  return (
    <div className='coin'> 
      <div className='coin-name'>
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>

        { <div className="coin-chart">
          <LineChart historicalData = {historicalData}/>
        </div> }

      { <div className="coin-chart">
        {historicalData?.prices ? (
          <LineChart historicalData={historicalData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div> }


{/* <div className="coin-info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol} {coinData.market_data.current_price[currency.name]}</li>
      </ul>
      <ul>
        <li>Market cap</li>
        <li>{currency.symbol} {coinData.market_data.market_cap[currency.name]}</li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name]}</li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name]}</li>
      </ul>
      
</div> */}


    </div>
  )
}

else {
  return (
    <div className='spinner'> 
      <div className="spin">

      </div>
    </div>
  )
}
}

export default Coin