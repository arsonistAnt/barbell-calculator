import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from './mainScreenHeader';
import Body from './mainScreenBody';
import PlateCalculation from '../../utils/PlateCalculation';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MainScreen = () => {
  const [weight, setWeight] = useState(0.0);

  let plates = PlateCalculation.calculateRequiredPlates(weight);

  const handleChangeWeight = (currWeight: number) => {
    setWeight(currWeight);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Header handleChangeWeight={handleChangeWeight} weight={weight} />
        <Body calculatedPlates={plates} />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
  },
});

export default MainScreen;
