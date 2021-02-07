import { BoardRenderer } from "./board-renderer";
import { BoardState } from "./board-state";

function init() {
    let board = BoardState.createFromString(`
##  ##
##  ##
RRR CC
# MMC#
 BBYY 
GGBYPP
G LL P
  LL  
`);

    const container = document.querySelector('.container');
    if (container == null) {
        throw 'Give me the container!!';
    }

    const boardRenderer = new BoardRenderer();
    boardRenderer.initialize(board);
    container.append(boardRenderer.rootElem);

    // setInterval(() => {
    //     while (true) {
    //         const pieceIndexes = Object.keys(board.pieces).map(p => parseInt(p));
    //         const randomPiece = pieceIndexes[Math.floor(Math.random() * pieceIndexes.length)];
    //         const moves = [
    //             {x: 1, y: 0},
    //             {x: -1, y: 0},
    //             {x: 0, y: 1},
    //             {x: 0, y: -1},
    //         ];
    //         const randomMove = moves[Math.floor(Math.random() * moves.length)];
    //         const newBoard = board.createShifted(randomPiece, randomMove);
    //         if (newBoard == null) {
    //             continue;
    //         }
    //         board = newBoard;
    //         boardRenderer.update(board);
    //         break;
    //     }
    // }, 20);
}

window.onload = init;