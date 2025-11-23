import Circle from "@/components/Circle";
import { useGameContext } from "@/context/gameContext";
import {
  OperationGenerator,
  OperationResult,
} from "@/utils/operationGenerator";
import { useNavigation } from "expo-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Game() {
  const { navigate } = useNavigation();
  const { difficulty, type } = useGameContext();
  const [triedNumber, setTriedNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<OperationResult | null>();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [status, setStatus] = useState<"correct" | "wrong" | "guessing">(
    "guessing"
  );

  const operationGenerator = useMemo(
    () => new OperationGenerator(difficulty, type, 3),
    [difficulty, type]
  );

  function getBackgroundColor(number: number) {
    if (status !== "guessing") {
      if (number === operation?.correctAnswer) {
        return "green";
      }
      if (triedNumber === number) {
        return "#324b50";
      }

      return "red";
    }
    return "transparent";
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigate("menu");
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setOperation(operationGenerator.generate());
  }, [difficulty]);

  function nextOperation() {
    setStatus("guessing");
    setTriedNumber(null);
    setOperation(operationGenerator.generate());
  }

  function retryOperation() {
    setStatus("guessing");
    setOperation((operation) =>
      operation
        ? operationGenerator.retry(operation)
        : operationGenerator.generate()
    );
  }

  function handleAnswer(value: number) {
    setTriedNumber(value);

    if (value === operation?.correctAnswer) {
      setStatus("correct");
      setCorrectAnswers((prev) => prev + 1);
      return;
    }

    setStatus("wrong");
    setCorrectAnswers(0);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={["#29B6D1", "#00C7C7"]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Acertos: {correctAnswers}</Text>
          <Text style={styles.headerText}>
            Dificuldade: {difficulty > 0 ? difficulty : "Aleatório"}
          </Text>
        </View>
        <View style={styles.boardBackground}>
          <View style={styles.operationSection}>
            {operation?.operands.map((number, index) => (
              <Fragment key={number + "_" + index}>
                <Text style={styles.operationText}>{number}</Text>
                {index !== operation.operands.length - 1 && (
                  <Text style={styles.operationText}>
                    {operation.type === "mult" && "x"}
                    {operation.type === "div" && "÷"}
                    {operation.type === "sub" && "-"}
                    {operation.type === "add" && "+"}
                  </Text>
                )}
              </Fragment>
            ))}
          </View>
        </View>
        <View style={styles.answerSection}>
          {operation?.options.map((number, index) => (
            <Circle
              key={"answer_" + number + "_" + index}
              value={number}
              disabled={status !== "guessing"}
              background={getBackgroundColor(number)}
              onPress={() => handleAnswer(number)}
            />
          ))}
        </View>
        <View style={styles.statusSection}>
          {status === "correct" && (
            <Text
              style={styles.statusText}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              Você acertou, parabéns!! 🎉
            </Text>
          )}
          {status === "wrong" && (
            <Text
              style={styles.statusText}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              Você errou 😔
            </Text>
          )}
          <View style={styles.buttonsSection}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  { opacity: status === "wrong" ? 1 : 0.5 },
                ]}
                onPress={status === "wrong" ? retryOperation : () => {}}
              >
                <Ionicons name="arrow-undo-outline" size={28} color="white" />
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Repetir
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.difficultyButton}
                onPress={() => navigate("difficulty")}
              >
                <Ionicons name="cog" size={30} color="white" />
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Dificuldade
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  { opacity: status === "guessing" ? 0.5 : 1 },
                ]}
                onPress={status !== "guessing" ? nextOperation : () => {}}
              >
                <Ionicons name="arrow-redo-outline" size={28} color="white" />
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Próxima
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.difficultyButton}
                onPress={() => navigate("menu")}
              >
                <Ionicons name="home" size={28} color="white" />
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Menu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View />
      </LinearGradient>
    </SafeAreaView>
  );
}

// Style Original
const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    //display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: 75,
    //margin: 15,
  },
  headerText: {
    //alignSelf: "center",
    fontSize: 18,
    //padding: 10,
    fontWeight: "700",
    color: "white",
  },
  boardBackground: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  operationSection: {
    //display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#036741",
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 8,
    borderColor: "#b4935f",
    width: "100%",
    minHeight: 150,
  },
  operationText: {
    fontSize: 45,
    //padding: 20,
    alignSelf: "center",
    textAlign: "center",
    //verticalAlign: "middle",
    //lineHeight: 55,
    color: "white",
    fontFamily: "Chawp",
  },
  answerSection: {
    //display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
    gap: 30,
  },
  statusSection: {
    //display: "flex",
    alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: 20,
  },
  statusText: {
    fontSize: 25,
    //padding: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    //alignSelf: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
    flexShrink: 1,
  },
  difficultyButton: {
    //padding: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 40,
    //alignSelf: "center",
    //color: "white",
    //display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //gap: 4,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    //display: "flex",
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-around",
    gap: 10,
    padding: 5,
    //width: "50%",
  },
  buttonsSection: {
    //display: "flex",
    flexDirection: "row",
    //alignItems: "center",
    //justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
});
