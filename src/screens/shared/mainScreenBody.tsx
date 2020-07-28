import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Body = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.weightText}>1 x 45 => 45LB</Text>
      <Text style={styles.weightText}>2 x 10 => 20LB</Text>
      <Text style={styles.weightText}>3 x 25 => 75LB</Text>

      <Text style={styles.remainingText}>Remaining: 1.131</Text>
    </View>
  );
};

//FIXME:- finalize styles, this will do for now
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
  },
  weightText: {
    fontSize: 25,
    color: 'white',
  },
  remainingText: {
    fontSize: 25,
    color: 'white',
    paddingTop: 100,
  },
});

export default Body;
