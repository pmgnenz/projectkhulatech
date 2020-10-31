import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TicketScreen = () => {

  var request = new XMLHttpRequest();
  request.open('POST', 'http://demo.splynx.com/api/2.0/admin/auth/tokens');
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.onreadystatechange = function () {
  
    if (this.readyState === 4) {
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
    }
  
  };
  
  var body = {
    'auth_type': 'customer',
    'login': 'bob',
    'password': 'hard_password'
  
  };
  
   request.send(JSON.stringify(body));

    return (
      <View style={styles.container}>
        <Text>ticket Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
