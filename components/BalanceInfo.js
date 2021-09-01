import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import {SIZES,FONTS,COLORS,icons, dummyData } from "../constants";
import { holdings } from '../constants/dummy';

import { getHoldings, getCoinMarket } from '../stores/market/marketActions';


const BalanceInfo=({title, displayAmount, containerStyle,changePct}) => {
    return(
        <View style={{...containerStyle}}>

            <Text style={{color:COLORS.lightGray3, ...FONTS.h2}}>{title}</Text>
            <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                <Text style={{color:COLORS.lightGray3, ...FONTS.h2}}>$</Text>
                <Text style={{marginLeft:SIZES.base,color:COLORS.white, ...FONTS.h2}}>{displayAmount.toLocaleString()}</Text>
                <Text style={{color:COLORS.lightGray3, ...FONTS.h2}}> USD</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'flex-end'}}>
            {
             changePct!=0&&
             <Image source={icons.upArrow}
             style={{width:15, height:15, alignSelf:'center', tintColor:( changePct > 0) ? COLORS.lightGreen : COLORS.red,
             transform: (changePct > 0 ) ? [ {rotate:'45deg'}] : [{rotate:'125deg'}] }}
             />}
            <Text 
            style={{marginLeft:SIZES.base, alignSelf:'flex-end',
            color: (changePct = 0 )? COLORS.lightGray3 : ( changePct > 0 ) ? COLORS.lightGreen:COLORS.red, ...FONTS.h3}}>{changePct.toFixed(2)}%
            </Text>
            <Text 
            style={{marginLeft:SIZES.base, alignSelf:'flex-end', color:COLORS.lightGray3, ...FONTS.h4}}>7d change</Text>
            </View>
        </View>

    )
}
export default BalanceInfo;