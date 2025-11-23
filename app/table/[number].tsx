import globalStyles from "@/assets/global.styles";
import Circle from "@/components/Circle";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Table() {
  const local = useLocalSearchParams();
  const { navigate } = useNavigation();

  return (
    <LinearGradient
      style={globalStyles.container}
      colors={["#29B6D1", "#00C7C7"]}
    >
      <Text style={styles.title}>Tabuada do {local.number}</Text>
      <View
        style={[
          styles.tables,
          local.number === "0"
            ? { justifyContent: "center" }
            : { justifyContent: "space-between" },
        ]}
      >
        <View style={styles.buttons}>
          {Array.from({ length: 11 }, (_, i) => i).map((tabular) => (
            <Text
              style={styles.tabular}
              key={"mult_" + tabular}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {tabular} x {local.number} = {tabular * Number(local.number)}
            </Text>
          ))}
        </View>
        {local.number !== "0" && (
          <View style={styles.buttons}>
            {Array.from({ length: 11 }, (_, i) => i * Number(local.number)).map(
              (tabular) => (
                <Text
                  style={styles.tabular}
                  key={"div_" + tabular}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {tabular} ÷ {local.number} = {tabular / Number(local.number)}
                </Text>
              )
            )}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigate("menu")}>
        <Text style={styles.buttonText}>Voltar ao menu</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tables: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 50,
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 10,
  },
  tabular: {
    width: "100%",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    padding: 10,
    color: "white",
  },
  button: {
    width: "50%",
    padding: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 40,
    //alignSelf: "center",
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
});
