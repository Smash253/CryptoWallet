import React, { isValidElement } from "react";
import { TouchableOpacity,} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { connect } from "react-redux";
import { setTradeModalVisibilty } from "../stores/tab/tabActions";
import  {TabIcon}  from "../components/";
import { Home, Portfolio, Market, Profile } from "../screens"
import { COLORS, icons } from "../constants"


const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({children, onPress}) => {
    return (
        <TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}} onPress={onPress} >
            {children}
        </TouchableOpacity>
    )
}

const Tabs = ({setTradeModalVisibilty, isTradeModalVisible}) => {

    function tradeTabButtonOnClickHandler() {
        setTradeModalVisibilty(!isTradeModalVisible)
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel:false,
                style: {
                    height:120,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon:( {focused} ) => {
                        if (!isTradeModalVisible) {
                            return (
                             <TabIcon 
                             focused={focused}
                             icon={icons.home}
                             label="Home"
                             />
                        )
                       } 
                    }} 
                    
                }
                listeners={{
                    tabPress: e=> {
                        if(isTradeModalVisible) {
                            e.preventDefault();
                        }
                    }}}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon:( {focused} ) => {
                        if (!isTradeModalVisible) {
                    return (
                        <TabIcon
                            focused={focused}
                            icon={icons.briefcase}
                            label="Portofolio"
                        />
                        )
                    }}
                }}
                listeners={{
                    tabPress: e=> {
                        if(isTradeModalVisible) {
                            e.preventDefault();
                        }
                    }}}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon:( {focused} ) => {
                        
                    return (
                        <TabIcon 
                            focused={focused}
                            icon={isTradeModalVisible? icons.close : icons.trade}
                            iconStyle={isTradeModalVisible? {
                                width:15,
                                height:15
                            }: null }
                            label="Trade"
                            isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                            onPress={()=> tradeTabButtonOnClickHandler()}
                        />
                    )
                }}
                
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon:( {focused} ) => {
                        if (!isTradeModalVisible) {
                    return (
                        <TabIcon 
                            focused={focused}
                            icon={icons.market}
                            label="Market"/>
                        )
                    }}
                }}
                listeners={{
                    tabPress: e=> {
                        if(isTradeModalVisible) {
                            e.preventDefault();
                        }
                    }}}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon:( {focused} ) => {
                        if (!isTradeModalVisible) {
                    return (
                        <TabIcon 
                            focused={focused}
                            icon={icons.profile}
                            label="Profile"
                            />
                        )
                    }}
                }}
                listeners={{
                    tabPress: e=> {
                        if(isTradeModalVisible) {
                            e.preventDefault();
                        }
                    }}}
            />
        </Tab.Navigator>
    )
}




function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setTradeModalVisibilty: (isVisible) => {return dispatch(setTradeModalVisibilty(isVisible))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tabs);