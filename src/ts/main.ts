import { BoardState } from "./board-state";

function createBoardElements(board: BoardState) {
    const container = document.querySelector('.board');
}

function init() {
    const board = BoardState.createFromString(`
##  ##
##  ##
RRR CC
# MMC#
 BBYY 
GGBYPP
G LL P
  LL  
`);
    createBoardElements(board);
}

window.onload = init;