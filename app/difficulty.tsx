import globalStyles from "@/assets/global.styles";
import Circle from "@/components/Circle";
import { useGameContext } from "@/context/gameContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DifficultySelector() {
  const { changeDifficulty, type } = useGameContext();
  const { navigate } = useNavigation();

  function chooseDifficulty(value: number) {
    changeDifficulty(value);
    navigate("loading");
  }

  return (
    <LinearGradient
      style={globalStyles.container}
      colors={["#29B6D1", "#00C7C7"]}
    >
      <Text style={styles.title}>Escolha a dificuldade</Text>
      <View style={styles.buttons}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((difficulty) => (
          <Circle
            key={difficulty}
            value={difficulty}
            onPress={() => chooseDifficulty(difficulty)}
          />
        ))}
        {type === "mult/div" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => chooseDifficulty(0)}
          >
            <Text style={styles.buttonText}>Aleatório</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    gap: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
    color: "white",
  },
  button: {
    width: "20%",
    padding: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 40,
    alignSelf: "center",
    color: "white",
  },
  buttonText: {
    color: "white",
  },
});
