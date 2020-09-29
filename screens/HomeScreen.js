import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
const HomeScreen = (props,{navigation}) => {
  function processResponse(response) {
    const statusCode = response.status;
    const data =  response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
  const { colors } = useTheme();

  const theme = useTheme();
  console.log("okeeeen", props.infos)
  const getnetworkinfos = () => {
   return fetch( "https://khulatechsolutions.unmsapp.com/nms/api/v2.1/nms/statistics?interval=hour", {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': props.infos.userToken
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
 getnetworkinfos();
  console.log(getnetworkinfos);
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate("Details")}
      />
      </View>
    );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    infos: state.appReducer.infoList
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
    justifyContent: 'center'
  },
});
