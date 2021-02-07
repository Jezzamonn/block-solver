import { BoardRenderer } from "./board-renderer";
import { BoardState } from "./board-state";

function choose<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makeRandomMove(board: BoardState): BoardState {
    while (true) {
        const pieceIndexes = Object.keys(board.pieces)
            .map(p => parseInt(p))
            .filter(p => board.pieces[p].moveable);
        const randomPiece = choose(pieceIndexes);
        const moves = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1},
        ];
        const randomMove = choose(moves);
        const newBoard = board.createShifted(randomPiece, randomMove);
        if (newBoard == null) {
            continue;
        }
        return newBoard;
    }
}

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

    const container = document.querySelector('.container')!;

    const boardRenderer = new BoardRenderer();
    boardRenderer.initialize(board);
    container.append(boardRenderer.rootElem);

    let currentInterval: number | undefined = undefined;

    const slider = document.querySelector<HTMLInputElement>('.speed-slider')!;
    slider.addEventListener('input', (evt) => {
        clearInterval(currentInterval);
        currentInterval = undefined;

        let sliderPos = parseFloat(slider.value);
        if (sliderPos == 0) {
            return;
        }

        // feels nicer if we square this I think
        sliderPos = sliderPos * sliderPos;

        // 1 -> 20 ms
        // 0 -> ∞ ms
        const period = 20 / sliderPos;
        currentInterval = window.setInterval(() => {
            board = makeRandomMove(board);
            boardRenderer.update(board);
        }, period);
    });
}

window.onload = init;