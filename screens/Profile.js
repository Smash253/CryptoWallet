import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Switch  
} from 'react-native';
import { MainLayout } from './';
import {SIZES,FONTS,COLORS,dummyData, icons } from "../constants";
import { HeaderBar } from '../components';

const SectionTitle = ({title}) => {
    return (
        <View style={{marginTop:25*2}}>
            <Text style={{color:COLORS.lightGray3, ...FONTS.h4}}>{title}</Text>
        </View>
    )
}

const Setting = ({title, value, type, onPress}) => {
    if (type == 'button') {
        return (
            <TouchableOpacity style={{ flexDirection:'row', height:50, alignItems:'center'}} onPress={onPress}>
                <Text style={{flex:1, color:COLORS.white, ...FONTS.h3}}>{title}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{color:COLORS.lightGray3, ... FONTS.h3, marginRight:SIZES.radius}}>{value}</Text>
                <Image source={icons.rightArrow} style={{height:15,width:15,tintColor:COLORS.white}} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={{ flexDirection:'row', height:50, alignItems:'center'}}>
                <Text style={{flex:1, color:COLORS.white, ...FONTS.h3}}>{title}</Text>
                <Switch onValueChange={() => onPress(value)} value={value} />
            </View>
        )
    }
}

const Profile = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
    <MainLayout>
        <View style={{
            flex:1,
            paddingHorizontal: SIZES.padding,
            backgroundColor:COLORS.black    
        }}>
            <HeaderBar title='Profile' />
            <ScrollView>
                <View style={{flexDirection:'row', marginTop:SIZES.radius}}>
                    <View style={{flex:1}}>
                        <Text style={{color: COLORS.white, ...FONTS.h3}}>{dummyData.profile.email}</Text>
                        <Text style={{color: COLORS.lightGray3, ...FONTS.body4}}>{dummyData.profile.id}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={icons.verified} style={{height:25, width:25}} />
                        <Text style={{marginLeft:2,color:COLORS.lightGreen, ...FONTS.body4}}>Verified</Text>
                    </View>
                </View>
                <SectionTitle title='APP' />
                <Setting title='Launch Screen' value='Home' type='button' onPress={()=> console.log('Pressed')} />
                <Setting title='Appearance' value='Dark' type='button' onPress={()=> console.log('Pressed')} />
                <SectionTitle title='ACCOUNT' />
                <Setting title='Payment Currency' value='USD' type='button' onPress={()=> console.log('Pressed')} />
                <Setting title='Language' value='English' type='button' onPress={()=> console.log('Pressed')} />
                <SectionTitle title='SECURITY' />
                <Setting title='TouchID' value={isEnabled} type='switch' onPress={toggleSwitch} />
                <Setting title='Change Password' type='button' onPress={()=> console.log('Pressed')} />
                <Setting title='Password Settings' type='button' onPress={()=> console.log('Pressed')} />
                <Setting title='2-FA' type='button' onPress={()=> console.log('Pressed')} />
            </ScrollView>
            <View style={{marginBottom:50}} />
        </View>
    </MainLayout>
    )
}

export default Profile;