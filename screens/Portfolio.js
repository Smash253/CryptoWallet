import React from 'react';
import { MainLayout } from './';
import {FlatList, View, Text, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';
import { useFocusEffect } from '@react-navigation/native';
import {SIZES,FONTS,COLORS,dummyData, icons } from "../constants";
import { BalanceInfo, Chart } from '../components';
import { LineChart } from 'react-native-chart-kit';
import { HeaderBar } from '../components';



const Portfolio = ({getHoldings, myHoldings}) => {

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
            <Text style={{marginTop:10, color:COLORS.white, ...FONTS.largeTitle}}>Portofolio</Text>
            <BalanceInfo title='Current Balance' displayAmount={totalWallet} changePct={percChange} containerStyle={{marginTop:SIZES.radius, marginBottom:SIZES.padding}} />
        </View>

       )
   }


   return (
    <MainLayout>
        <View style={{flex:1,backgroundColor:COLORS.black}}>
            
            {/*Wallet*/}
            {renderCurrentBalanceSection()}

            {/*Chart*/}
            <Chart containerStyle={{margin:SIZES.radius *2}} chartPrices={myHoldings[0] ?.sparkline_in_7d?.value} />
            
            {/*Holdings*/}
            <FlatList data={myHoldings} keyExtractor={item=>item.id} contentContainerStyle={{marginTop:50,paddingHorizontal:SIZES.padding}} 
            ListHeaderComponent={
            
            <View style={{marginBottom:30}}>
              <Text style={{color:COLORS.white, ...FONTS.h3, fontSize: 20}}>Portofolio</Text>
              <View style={{flexDirection:'row', marginTop:SIZES.radius}}>
                  <Text style={{flex:1, color:COLORS.lightGray3}}>Asset</Text>
                  <Text style={{flex:1,textAlign:'right' ,color:COLORS.lightGray3}}>Price</Text>
                  <Text style={{flex:1,textAlign:'right' ,color:COLORS.lightGray3}}>Holdings</Text>
              </View>
            </View>}

                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={{height:70,justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
                            <View style={{width:25}}>
                               <Image source={{uri: item.image}} style={{width:20 ,height:20}} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
             
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

  export default connect(mapStateToProps,mapDispatchToProps)(Portfolio);