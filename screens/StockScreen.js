import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StockScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Stock Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default StockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
