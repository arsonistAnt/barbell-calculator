import React, { useState, FunctionComponent } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

type Props = {
  handleChangeWeight: (currWeight: number) => void;
  weight: number;
};

const Header: FunctionComponent<Props> = ({
  handleChangeWeight,
  weight: number,
}) => {
  const [text, setText] = useState("");
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
          placeholder="135.0"
          onSubmitEditing={(submitEvent) => {
            let targetWeight: number = parseFloat(submitEvent.nativeEvent.text);
            handleChangeWeight(targetWeight);
          }}
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    backgroundColor: "#CC2B25",
    alignItems: "center",
    justifyContent: "center",
  },
  targetText: {
    color: "black",
    fontSize: 20,
  },
  weightText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    paddingTop: 10,
  },
});

export default Header;
