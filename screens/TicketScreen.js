import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TicketScreen = () => {
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
