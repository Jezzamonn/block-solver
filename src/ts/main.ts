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

        // Trying to create the following
        // 0 -> ∞ s -> 0 Hz
        // 0.1 -> 0.3s -> 3 Hz -> 6%
        // 0.5 -> 0.1s -> 10 Hz -> 20%
        // 1 -> 0.02 s (10 ms) -> 50 Hz -> 100%
        const freq = 49 * Math.pow(sliderPos, 3) + 1;
        const period = 1 / freq;

        currentInterval = window.setInterval(() => {
            board = makeRandomMove(board);
            boardRenderer.update(board);
        }, 1000 * period);

        const animTime = Math.max(0.8 * period, 0.1);

        document.documentElement.style.setProperty('--slide-speed', animTime + 's');
    });
}

window.onload = init;