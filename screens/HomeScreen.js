import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import CButton from './Cbutton'; 

const HomeScreen = (props,{navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  console.log("okeeeen", props.infos1);
  const [data, setData] = React.useState({
  userToken: 0, //'9fb192dc-423b-45c9-b55b-94166b66c9f0',//props.infos1[0].userToken,
  outages: 0,
  unassigned: 7,
  active: 40,
  allClients: 0,
  liveclient: 0,
  allsites: 0,
  livesites: 0,
  networkhealth:0,
});
  //console.log("okeeeen 22222", props.infos1[0].userToken);
  const getApiAsync = async () => {
    try {
      let response = await fetch(
         "https://khulatechsolutions.unmsapp.com/nms/api/v2.1/nms/statistics?interval=hour", {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          'x-auth-token': data.userToken
        }});
      let json = await response.json();
      console.log( json);
      console.log("onnnnnnn");
      //console.log(json.allClients[0].y);
      setData({
        ...data,
        allClients: json.allClients[0].y,
        outages: json.outages[0].y,
        allsites: json.allSites[0].y,
        livesites: json.liveSites[0].y,
        liveclient: json.liveClients[0].y,
        networkhealth:Math.round ((json.networkHealth[0].y)*100),
    });
    //console.log(data.allClients);
      console.log("ooooonn2");
      console.log(json["allClients"]);
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  const getnetworkinfos = async() => {
   return await fetch( "https://khulatechsolutions.unmsapp.com/nms/api/v2.1/nms/statistics?interval=hour", {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': props.infos1[0].userToken
  }
  }).then(processResponse) 
  .then(res => {
    const { statusCode, data } = res;
    console.log ("dataaaaaa1", data);
    return data;
  })
  .catch((error) => {
    console.error(error);
  });
};
getApiAsync();



//const stability =() => {
//  getnetworkinfos();
//  console.log(getnetworkinfos);
//  console.log( "whhhhhh" + getnetworkinfos["networkHealth"]);
 //return getnetworkinfos()["networkHealth"][0];
//}
 //stability();
 const outages = 10;
 const unassigned = 7;
 const active = 40;
  //console.log(getnetworkinfos);
    return (
      
      <View style={styles.container}>
          
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={styles.network}>{data.networkhealth + "%"}</Text>
        <Text style={{color: colors.text}}>network stability</Text>
        <View style={styles.containers}>
              <View style={styles.buttonContainers}>
              <Button title={data.outages + " \n Outages"}/>
              </View>
              <View style={styles.buttonContainers}>
                <Button title={data.unassigned +" \n unassigned"}/>
              </View>
              <View style={styles.buttonContainers}>
                <Button title={data.active +"  \n active"}/>
              </View>
          </View>
       
       <View style={styles.buttonContainer}>
      <Button
        style={styles.addButton}
        title="Go to details screen"
        onPress={() => navigation.navigate("Details")}
      />
      </View>
      </View>
    );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    infos1: state.appReducer.infoList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
buttonContainer: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
containers: {
  flex: 1,
  flexDirection: 'row',
  // alignItems: 'center',
  justifyContent: 'space-around',
  //height: '50%',
},
buttonContainers: {
  flex: 1,
  padding: 5,
  height: 150,
  //width: '30%',
  
},
addButton: {
  zIndex: 1111,
  width: 200
},
network: {
  //color: colors.text,
  //flex:1,
  fontSize: 40,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
},
buttonText: {
  textAlign: 'center',
  padding: 20,
  color: 'white'
},
button: {
  flex: 1,
  //marginBottom: 30,
  //alignItems: 'center',
  backgroundColor: '#2196F3'
},

buttons: {
  backgroundColor: 'green',
  width: '40%',
  height: 40
}
});
