import fs from "fs";
// makemall functions this time

function Dealer(randomVals) {
  this.rounds = randomVals
    .split(",")
    .map((x) => parseInt(x))
    .reverse();
  this.runRound = function () {
    return this.rounds.pop();
  };
  this.checkBoard = function (board) {
    if (board.isWinner) {
      return true;
    }
    const { squares } = board;
    const candidateColumns = squares[0].map(() => true);

    for (let row = 0; row < squares.length; row++) {
      let canWinRow = true;
      for (let col = 0; col < squares[row].length; col++) {
        const square = squares[row][col];

        canWinRow = canWinRow && square.isMarked;
        candidateColumns[col] = candidateColumns[col] && square.isMarked;

        if (!canWinRow && !candidateColumns.some((x) => x)) {
          break;
        }
      }
      if (canWinRow) {
        return true;
      }
    }
    return candidateColumns.some((x) => x);
  };
}

function Board(lines) {
  this.isWinner = false;
  this.squares = lines.split("\n").map((line) => {
    return line.split(" ").reduce((acc, curr) => {
      const parsed = parseInt(curr);
      if (!isNaN(parsed)) {
        acc.push({ value: parsed, isMarked: false });
      }
      return acc;
    }, []);
  });
  this.sumUnmarked = function () {
    return this.squares.reduce((boardacc, line) => {
      boardacc += line.reduce((lineacc, entry) => {
        return lineacc + (entry.isMarked ? 0 : entry.value);
      }, 0);
      return boardacc;
    }, 0);
  };
  this.updateCard = function (num) {
    if (!this.isWinner) {
      this.squares = this.squares.map(
        (
          x //inefficient, but readable...always optimze later
        ) =>
          x.map((y) => ({
            value: y.value,
            isMarked: y.isMarked || y.value === num,
          }))
      );
    }
  };
}

const runGame = function (inputs, stopAtFirst) {
  const [roundInput, ...boardInputs] = inputs.split("\n\n");
  const dealer = new Dealer(roundInput);
  const boards = boardInputs.map((board) => new Board(board));
  let draw;
  let lastWinner;
  do {
    draw = dealer.runRound();
    for (let i = 0; i < boards.length; i++) {
      const b = boards[i];
      if (!b.isWinner) {
        b.updateCard(draw);
        if (dealer.checkBoard(b)) {
          if (stopAtFirst) {
            return draw * b.sumUnmarked();
          }
          b.isWinner = true;
          lastWinner = { draw, boardIndex: i };
        }
      }
    }
  } while (draw !== undefined);
  return lastWinner.draw * boards[lastWinner.boardIndex].sumUnmarked();
};

const inputsReal = fs.readFileSync("dayfour/input.txt", "utf8");

export function dayFourPartA() {
  return runGame(inputsReal, true);
}

export function dayFourPartB() {
  return runGame(inputsReal, false);
}
