import { Dimensions, StyleSheet } from "react-native";

const screenSize = Dimensions.get("screen");
const globalStyles = StyleSheet.create({
  container: {
    width: screenSize.width,
    height: screenSize.height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default globalStyles;
