import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './shared/mainScreenHeader';
import Body from './shared/mainScreenBody';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
});

export default MainScreen;
