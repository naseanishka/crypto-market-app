import React from 'react'
import './Home.css'
import { useContext, useState, useEffect } from 'react'
import { CoinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

    const { allCoin, currency } = useContext(CoinContext);
    const [ displayCoin, setDisplayCoin ] = useState([])
    const [ input, setInput ] = useState('')

    const handleInput = (e) => {
        setInput(e.target.value)

        if (e.target.value === '') {
            setDisplayCoin(allCoin)
        }
    }

    // const searchHandler = async (e) => {
    //     e.preventDefault()
    //     await allCoin.filter((item) => {
    //         if (item.name.toLowerCase().includes(input.toLowerCase())) {
    //             setDisplayCoin([item])
    //         }
    //     })
    // }


    const searchHandler = async (e) => {
        e.preventDefault()

        const coins = await allCoin.filter((item) => {
            // if (item.name.toLowerCase().includes(input.toLowerCase())) {
            //     setDisplayCoin([item])
            // }

            return item.name.toLowerCase().includes(input.toLowerCase())
        })

        setDisplayCoin(coins)
    }


    useEffect(() => {
        setDisplayCoin(allCoin)
    }, [allCoin])

  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br/> Crypto Market</h1>
            <p>Welcome to world's largest Crypto Market. Sign up to explore more</p>
            <form onSubmit = { searchHandler } >

                <input onChange = { handleInput } list = 'coinlist' value = { input }  type="text" placeholder='Search yoour crypto..' required/>

                <datalist id = 'coinlist'>
                    {
                    allCoin.map((item, index) => (
                        <option key = {index} value = {item.name}/>))
                    }
                </datalist>

                <button type='submit'>Search</button>
            </form>
        </div>

        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style = {{ textAlign: "center" }}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>

            {/* Display only first 10 resuts, so use slice */}
            {/* {
                displayCoin.slice(0,10).map((item, index) => (
                    <div className="table-layout" key = {index}>
                        <p>{item.market_cap_rank}</p>
                    </div>
                ))
            } */}


            
            {
            displayCoin.slice(0,10).map((item, index) => {
                // return <p key = {index}>{item.market_cap_rank}</p>

                return (
                    <Link to = {`/coin/${item.id}`} className="table-layout" key = {index}>
                        <p> 
                            {item.market_cap_rank}
                        </p>


                        <div>
                            <img src = {item.image} alt="" />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>


                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className = {item.price_change_percentage_24h > 0 ? "green" : "red"}>
                            {/* To get upto 2 deciaml places, * by 100 and use Math.floor then divide by 100 */}
                            {Math.floor(item.price_change_percentage_24h * 100) / 100}
                        </p>

                        <p className='market-cap'> {currency.symbol} {item.market_cap.toLocaleString()}</p>

                    </Link>
                )
            })
            }






        </div>
    </div>
  )
}

export default Home