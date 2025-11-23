import globalStyles from "@/assets/global.styles";
import Circle from "@/components/Circle";
import { useGameContext } from "@/context/gameContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
  const { changeType } = useGameContext();
  const { navigate } = useNavigation();

  function chooseType(type: "add/sub" | "mult/div") {
    changeType(type);
    navigate("difficulty");
  }

  return (
    <LinearGradient
      style={globalStyles.container}
      colors={["#29B6D1", "#00C7C7"]}
    >
      <Text style={styles.title}>Bem vindo ao Gênio da Matemática</Text>
      <Text style={styles.subtitle}>
        Selecione o tipo de operação e vamos praticar
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => chooseType("add/sub")}
        >
          <Text style={styles.buttonText}>Adição e Subtração</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => chooseType("mult/div")}
        >
          <Text style={styles.buttonText}>Multiplicação e Divisão</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>ou veja a Tabuada</Text>
      <View style={styles.buttons}>
        {Array.from({ length: 11 }, (_, i) => i).map((difficulty) => (
          <Circle
            key={difficulty}
            value={difficulty}
            onPress={() => navigate("table/[number]", { number: difficulty })}
          />
        ))}
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
    fontSize: 50,
    fontWeight: "bold",
    padding: 30,
    color: "white",
  },
  button: {
    width: "40%",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 40,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 25,
    padding: 10,
    width: "100%",
    color: "white",
  },
});
