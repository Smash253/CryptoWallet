import React from 'react';
import {FlatList, View, Text, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';
import { useFocusEffect } from '@react-navigation/native';
import {SIZES,FONTS,COLORS,dummyData, icons } from "../constants";
import { MainLayout } from './';
import { BalanceInfo, Chart } from '../components';
import { LineChart } from 'react-native-chart-kit';
import { HeaderBar } from '../components';




const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {

    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
            getCoinMarket()
        }, [])
    )
        
        let totalWallet = myHoldings.reduce((a,b) => a + (b.total || 0), 0);
        let valueChange = myHoldings.reduce((a,b) => a + (b.holding_value_change_7d || 0), 0);
        let percChange = valueChange / (totalWallet-valueChange)*100;
        
        function renderCurrentBalanceSection() {
          return(
           <View style={{paddingHorizontal:SIZES.padding, borderBottomLeftRadius:25, borderBottomRightRadius:25, backgroundColor:COLORS.gray}}>
               <Text style={{marginTop:10, color:COLORS.white, ...FONTS.largeTitle}}>My Wallet</Text>
               <BalanceInfo title='Current Balance' displayAmount={totalWallet} changePct={percChange} containerStyle={{marginTop:SIZES.radius, marginBottom:SIZES.padding}} />
           </View>
   
          )
      }

    return (
    <MainLayout>
        <View style={{flex:1,backgroundColor:COLORS.black}} >
          
            {/*Wallet*/}
            {renderCurrentBalanceSection()}

            {/*Chart*/}
            <View style={{marginTop:SIZES.padding * 3}}>
            <Chart containerStyle={{marginTop:SIZES.padding * 2}} chartPrices={coins[0]?.sparkline_in_7d?.price} />
            </View>

            {/*Top Cyrpto*/}
            <FlatList data={coins} keyExtractor={item=>item.id} contentContainerStyle={{marginTop:30,paddingHorizontal:SIZES.padding}} ListHeaderComponent={
            <View style={{marginBottom:30}}>
              <Text style={{color:COLORS.white, ...FONTS.h3, fontSize: 20}}>Top Crypto</Text>
            </View>} 
            renderItem={({item})=>{

              let priceColor= (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red

              return (
              <TouchableOpacity style={{ height:70,justifyContent:'center', flexDirection:'row', alignItems:'center' }}>
                <View style={{width:25}}>
                  <Image source={{uri:item.image}} style={{width:20, height:20, }} />  
                </View>

                <View style={{flex:1}}>
                  <Text style={{color:COLORS.white, ...FONTS.h3}}>{item.name}</Text>
                </View>

                <View>
                  <Text style={{color:COLORS.white, textAlign:'right', ...FONTS.h4}}>{item.current_price} $</Text>
                </View>

                <View style={{ flexDirection:'row-reverse',alignItems:'center', justifyContent:'flex-end'}}>
                  {item.price_change_percentage_7d_in_currency !=0 && 
                    <Image source={icons.upArrow} style={{width:11, height:11, tintColor:priceColor, transform:
                    item.price_change_percentage_7d_in_currency > 0? [{rotate:'45deg'}] : [{rotate:'125deg'}]
                    }} />}
                  <Text style={{marginLeft:12, color:priceColor, ...FONTS.body5, lineHeight:15}}>{item.price_change_percentage_7d_in_currency.toFixed(2)}</Text>
                </View>

              </TouchableOpacity>
              )
            
            }} ListFooterComponent={<View style={{marginBottom:50}} />} 
            
            />
            
        </View>
    </MainLayout> 
    )
}


function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getHoldings: (holdings, currency, coinList, orderBy,
         sparkline, priceChangePerc, perPage, Page) =>  {return dispatch(getHoldings(holdings, currency, coinList, orderBy,
          sparkline, priceChangePerc, perPage, Page))},
          getCoinMarket: (currency, coinList, orderBy,
            sparkline, priceChangePerc, perPage, Page) => {return dispatch(getCoinMarket(currency, coinList, orderBy,
              sparkline, priceChangePerc, perPage, Page))}
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Home);