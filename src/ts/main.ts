import { BoardState } from "./board-state";

function createBoardElements(board: BoardState) {
    const container = document.querySelector<HTMLElement>('.board');
    if (container == null) {
        throw new Error('The container cannot be null!');
    }

    // Sizing stuff
    const boardWidth = board.board[0].length;
    const boardHeight = board.board.length;

    const widthRatio = boardWidth / Math.max(boardWidth, boardHeight);
    const heightRatio = boardHeight / Math.max(boardWidth, boardHeight);
    container.style.width = (100 * widthRatio).toFixed(2) + '%';
    container.style.height = (100 * heightRatio).toFixed(2) + '%';

    const blockWidth = (100 / boardWidth);
    const blockHeight = (100 / boardHeight);
    const root = document.documentElement;
    root.style.setProperty('--block-width', blockWidth.toFixed(2) + '%');
    root.style.setProperty('--block-height', blockHeight.toFixed(2) + '%');

    const pieces = board.pieces;
    for (const pieceIndex in pieces) {
        const piece = pieces[pieceIndex];

        const pieceElem = document.createElement('div');
        pieceElem.style.left = (piece.firstPosition.x * blockWidth).toFixed(2) + '%';
        pieceElem.style.top = (piece.firstPosition.y * blockHeight).toFixed(2) + '%';
        pieceElem.classList.add('piece');

        for (const subPiecePos of piece.shape) {
            const subPieceElem = document.createElement('div');
            subPieceElem.classList.add('sub-piece');
            subPieceElem.style.left = (100 * subPiecePos.x) + '%';
            subPieceElem.style.top = (100 * subPiecePos.y) + '%';
            pieceElem.append(subPieceElem);
        }

        container.append(pieceElem);
    }
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