import globalStyles from "@/assets/global.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function Loading() {
  const [stage, setStage] = useState(0);
  const { navigate } = useNavigation();

  useEffect(handleStage, [stage]);

  const loadingStages = [
    { text: "Vamos jogar!!", timeout: 1300 },
    { text: "3..", timeout: 1000 },
    { text: "2..", timeout: 1000 },
    { text: "1..", timeout: 1000 },
    { text: "Começar!!", timeout: 1300 },
  ];

  function handleStage() {
    if (stage == loadingStages.length - 1) {
      navigate("game");
      return;
    }

    setTimeout(
      () => setStage((prev) => prev + 1),
      loadingStages[stage].timeout
    );
  }

  return (
    <LinearGradient
      style={globalStyles.container}
      colors={["#29B6D1", "#00C7C7"]}
    >
      <Text style={styles.text}>{loadingStages[stage].text}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    padding: 15,
    color: "white",
  },
});
