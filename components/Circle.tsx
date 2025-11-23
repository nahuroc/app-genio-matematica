import { ColorValue, StyleSheet, Text, TouchableOpacity } from "react-native";

type CircleProps = {
  value: number;
  disabled?: boolean;
  background?: ColorValue;
  onPress: VoidFunction;
};

export default function Circle(props: CircleProps) {
  const styles = StyleSheet.create({
    circle: {
      //aspectRatio: "1/1",
      borderRadius: 30,
      borderColor: "white",
      borderWidth: 2,
      padding: 5,
      //display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      backgroundColor: props.background || "transparent",
    },
    value: {
      width: "100%",
      //margin: 0,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 24,
      color: "white",
    },
  });

  return (
    <TouchableOpacity
      style={styles.circle}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit={true}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
}
