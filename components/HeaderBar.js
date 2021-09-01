import { from } from 'form-data';
import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import {COLORS, dummyData, FONTS, SIZES} from '../constants';


const HeaderBar = ({title}) => {
    return (
        <View style={{height:70, paddingHorizontal:SIZES.radius, justifyContent:'flex-end'}}>
            <Text style={{color:COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
            
        </View>
    )
}

export default HeaderBar;