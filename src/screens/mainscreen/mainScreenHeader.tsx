import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
const Header = ({ handleChangeWeight, weight }) => {
  const [text, setText] = useState('');

  const validations = (text: string) => {
    //let onSubmitRegExpression = /^[0-9]+(\.[0-9]{1,1})?$/gim; all numbers no decimals
    let numRegExpression = /^(\d*(\.\d{0,2})?|\.?\d{1,2})$/gim; // 2 decimal places and numbers

    if (numRegExpression.test(text)) {
      setText(text);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.targetText}>Target Weight</Text>
        <TextInput
          returnKeyLabel="Done"
          returnKeyType="done"
          keyboardType="decimal-pad"
          style={styles.weightText}
          maxLength={7}
          onChangeText={(text) => validations(text)}
          value={text}
          placeholder="135.0"
          onSubmitEditing={(value) => handleChangeWeight(value)}
        ></TextInput>
      </View>
    </View>
  );
};

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
