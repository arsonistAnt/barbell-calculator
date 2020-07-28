import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Header = () => {
  const [weight, setWeight] = useState('');

  //FIXME:- Convert to Num for Anthony's algo & fix decimal to precision of 1. Also refactor.
  // Use this? https://github.com/wwdrew/react-native-numeric-textinput
  const validations = (value: String) => {
    let numRegExpression = /[`a-zA-Z- #*;,<>\{\}\[\]\\\/]/gi;
    setWeight(value.replace(numRegExpression, ''));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.targetText}>Target Weight</Text>
        <TextInput
          keyboardType="decimal-pad"
          style={styles.weightText}
          maxLength={7}
          onChangeText={(value) => validations(value)}
          value={weight}
        ></TextInput>
      </View>
    </View>
  );
};

//FIXME:- finalize styles, this will do for now
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    backgroundColor: '#CC2B25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetText: {
    color: 'black',
    fontSize: 20,
  },
  weightText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
  },
});

export default Header;
