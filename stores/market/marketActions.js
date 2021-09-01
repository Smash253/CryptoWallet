import axios from "axios";


export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN"
export const GET_HOLDINGS_SUCCES = "GET_HOLDINGS_SUCCES"
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE"
export const GET_COIN_MARKET_SUCCES = "GET_COIN_MARKET_SUCCES"
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE"
export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN"

//Holdings
    export const getHoldingsBegin =() => ({
        type: GET_HOLDINGS_BEGIN
    });

    export const getHoldingsSucces =(myHoldings) => ({
        type: GET_HOLDINGS_SUCCES,
        payload: {myHoldings}
    });

    export const getHoldingsFailure =(error) => ({
        type: GET_HOLDINGS_FAILURE,
        payload:{error}
    });


export function getHoldings(holdings = [], currency='usd', orderBy='maket_cap_desc',
 sparkline = true, priceChangePerc='7d', perPage=10, page=1) {

        return dispatch => {
            dispatch(getHoldingsBegin())
            let ids = holdings.map((item)=>{return item.id}).join(',')
            let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`
            return axios({
                url: apiUrl,
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => {
                console.log("GetHoldings");
                console.log(response);
                if(response.status == 200) {
                    //Massage Data
                    let myHoldings = response.data.map((item) => {
                        //Retrive our current Holdings
                        let coin = holdings.find(a=>a.id==item.id)
                        //Price from 7d
                        let price7d= item.current.price/(1+item.price_change_percentage_7d_in_currency * 0.01)

                        return {
                            id: item.id,
                            symbol: item.symbol,
                            name: item.name,
                            image: item.image,
                            current_price: item.current_price,
                            qty: coin.qty,
                            total: coin.qty * item.current_price,
                            price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                            holding_value_change_7d: (item.current_price-price7d) * coin.qty,
                            sparkline_in_7d:{
                                value: item.sparkline_in_7d.price.map((price) =>{
                                    return price*coin.qty   
                                })
                            } 
                        }

                    })

                    dispatch(getHoldingsSucces(myHoldings))

                } else {
                    dispatch(getHoldingsFailure(response.data))
                }
            }).catch((error) => {
                dispatch(getHoldingsFailure(error))
            })
        }

}

//Market

export const getCoinMarketBegin = () => ({
    type:GET_COIN_MARKET_BEGIN
})

export const getCoinMarketSucces = (coins) => ({
    type: GET_COIN_MARKET_SUCCES,
    payload:{coins}
})

export const getCoinMarketfailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload:{error}
})

export function getCoinMarket(currency='usd', 
orderBy='market_cap_desc', sparkline=true, priceChangePerc='7d', perPage=10, page=1) {

    return dispatch =>{
        dispatch(getCoinMarketBegin())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

        return axios({
            url:apiUrl,
            method: 'GET',
            headers: { Accept: 'application/json'}
        }).then((response) => {
            console.log("Coins");
            console.log(response)
            if(response.status == 200) {
                dispatch(getCoinMarketSucces(response.data))
            } else {
                dispatch(getCoinMarketfailure(response.data))
            }
        }).catch((error) => {
            dispatch(getCoinMarketfailure(error))
        })
    } 

}