export type OperationResult = {
  operands: number[];
  options: number[];
  correctAnswer: number;
  type: "sub" | "add" | "mult" | "div";
};

const OPTION_RANGE = 15;

export class OperationGenerator {
  constructor(
    private difficulty: number,
    private type: "add/sub" | "mult/div",
    private optionsLength: number = 4
  ) {}

  private getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private generateSub(
    firstOperand?: number,
    secondOperand?: number
  ): OperationResult {
    firstOperand = firstOperand || this.getRandom(0, this.difficulty * 10);
    secondOperand = secondOperand || this.getRandom(0, firstOperand);

    const correctAnswer = firstOperand - secondOperand;

    let minAnswer = correctAnswer - OPTION_RANGE;
    if (minAnswer < 0) minAnswer = 0;

    const options = Array.from({ length: this.optionsLength }, () =>
      this.getRandom(minAnswer, correctAnswer + OPTION_RANGE)
    );

    if (!options.includes(correctAnswer))
      options[this.getRandom(0, options.length - 1)] = correctAnswer;

    return {
      operands: [firstOperand, secondOperand],
      correctAnswer: correctAnswer,
      options: options,
      type: "sub",
    };
  }

  private generateAdd(
    firstOperand?: number,
    secondOperand?: number
  ): OperationResult {
    firstOperand =
      firstOperand || Math.floor(Math.random() * 10 * this.difficulty);
    secondOperand =
      secondOperand || Math.floor(Math.random() * 10 * this.difficulty);

    const correctAnswer = firstOperand + secondOperand;

    let minAnswer = correctAnswer - OPTION_RANGE;
    if (minAnswer < 0) minAnswer = 0;

    const options = Array.from({ length: this.optionsLength }, () =>
      this.getRandom(minAnswer, correctAnswer + OPTION_RANGE)
    );

    if (!options.includes(correctAnswer))
      options[this.getRandom(0, options.length - 1)] = correctAnswer;

    return {
      operands: [firstOperand, secondOperand],
      correctAnswer: correctAnswer,
      options: options,
      type: "add",
    };
  }

  generateMultiplication(
    firstOperand?: number,
    secondOperand?: number
  ): OperationResult {
    const difficultyOperand =
      this.difficulty === 0 ? this.getRandom(1, 10) : this.difficulty;
    firstOperand = firstOperand || difficultyOperand;
    secondOperand = secondOperand || this.getRandom(1, 10);

    const correctAnswer = firstOperand * secondOperand;

    let minAnswer = correctAnswer - OPTION_RANGE;
    if (minAnswer < 0) minAnswer = 0;

    const options = Array.from({ length: this.optionsLength }, () =>
      this.getRandom(minAnswer, correctAnswer + OPTION_RANGE)
    );

    if (!options.includes(correctAnswer))
      options[this.getRandom(0, options.length - 1)] = correctAnswer;

    return {
      operands: [firstOperand, secondOperand],
      correctAnswer: correctAnswer,
      options: options,
      type: "mult",
    };
  }

  generateDivision(
    firstOperand?: number,
    secondOperand?: number
  ): OperationResult {
    const difficultyOperand =
      this.difficulty === 0 ? this.getRandom(1, 10) : this.difficulty;

    var factor = this.getRandom(1, 10);
    firstOperand = firstOperand || difficultyOperand * factor;
    secondOperand = secondOperand || difficultyOperand;

    const correctAnswer = firstOperand / secondOperand;
    let minAnswer = correctAnswer - OPTION_RANGE;
    if (minAnswer < 0) minAnswer = 0;

    const options = Array.from({ length: this.optionsLength }, () =>
      this.getRandom(minAnswer, correctAnswer + OPTION_RANGE)
    );
    if (!options.includes(correctAnswer))
      options[this.getRandom(0, options.length - 1)] = correctAnswer;

    return {
      operands: [firstOperand, secondOperand],
      correctAnswer: correctAnswer,
      options: options,
      type: "div",
    };
  }

  generate(): OperationResult {
    const operator = this.getRandom(0, 1);
    if (this.type === "add/sub") {
      if (operator) return this.generateSub();
      else return this.generateAdd();
    }

    if (operator) return this.generateMultiplication();
    else return this.generateDivision();
  }

  retry(operation: OperationResult): OperationResult {
    if (this.type === "mult/div") {
      if (operation.type === "mult")
        return this.generateMultiplication(
          operation.operands[0],
          operation.operands[1]
        );
      else
        return this.generateDivision(
          operation.operands[0],
          operation.operands[1]
        );
    }

    if (operation.type === "sub")
      return this.generateSub(operation.operands[0], operation.operands[1]);
    else return this.generateAdd(operation.operands[0], operation.operands[1]);
  }
}
