import React, { useState, FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  handleChangeWeight: (currWeight: number) => void;
  weight: number;
  placerHolderDefault: number;
};

/**
 * Displays default placeholder text
 * @param conversionTypeEnum The enum for conversion.
 * See PlateCalculation.tsx WeightConversions
 */
const convertEnumToDefaultPlaceholderText = (conversionTypeEnum: number) => {
  let conversionEnum = conversionTypeEnum;

  return conversionEnum == 1 ? '135.0 lb' : '20.0 kg';
};

const Header: FunctionComponent<Props> = ({
  handleChangeWeight,
  weight: number,
  placerHolderDefault,
}) => {
  const mainTheme = useTheme();
  const styles = stylesWithTheme(mainTheme);
  const [text, setText] = useState('');
  const validations = (text: string) => {
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
          placeholder={convertEnumToDefaultPlaceholderText(placerHolderDefault)}
          onSubmitEditing={(submitEvent) => {
            let targetWeight: number = parseFloat(submitEvent.nativeEvent.text);
            handleChangeWeight(targetWeight);
          }}
        ></TextInput>
      </View>
    </View>
  );
};

const stylesWithTheme = (theme: ReactNativePaper.Theme) => {
  const { fonts, colors } = theme;

  return StyleSheet.create({
    container: {
      width: '100%',
      height: '30%',
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    targetText: {
      color: colors.text,
      fontSize: 20,
      ...fonts.regular,
    },
    weightText: {
      fontSize: 30,
      color: 'white',
      alignSelf: 'center',
      paddingTop: 10,
    },
  });
};

export default Header;
