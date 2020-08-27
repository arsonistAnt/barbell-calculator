import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

/**
 * Displays leftoverweight
 * @param leftoverWeight The remainder weight from calculatedPlates.
 */
const displayLeftOverWeight = (leftoverWeight: number) => {
  const styles = stylesWithTheme(useTheme());
  if (leftoverWeight >= 0) {
    return (
      <Text style={styles.remainingText}>Remaining: {leftoverWeight}</Text>
    );
  } else {
    return <Text style={styles.remainingText}>Not Rackable</Text>;
  }
};

/**
 * Displays plates
 * @param plates The plates from calculatedPlates.
 * //TODO:- Display KG after finishing UI
 */
const displayPlates = (plates: Array<any>) => {
  return plates === undefined ? (
    <Text></Text>
  ) : (
    plates.map((item, index) => (
      <Text key={index}>
        {item.amount +
          ' x ' +
          item.type +
          ' => ' +
          item.amount * item.type +
          ' \n'}
      </Text>
    ))
  );
};

const Body: React.FC<any> = ({ calculatedPlates }) => {
  const { leftoverWeight, plates } = calculatedPlates;
  const styles = stylesWithTheme(useTheme());
  return (
    <View style={styles.container}>
      <Text style={styles.weightText}>{displayPlates(plates)}</Text>
      {displayLeftOverWeight(leftoverWeight)}
    </View>
  );
};

const stylesWithTheme = (theme: ReactNativePaper.Theme) => {
  const { fonts, colors } = theme;
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: 50,
    },
    weightText: {
      ...fonts.light,
      fontSize: 25,
      color: 'white',
    },
    remainingText: {
      ...fonts.regular,
      fontSize: 25,
      color: 'white',
      paddingTop: 100,
    },
  });
};

export default Body;
