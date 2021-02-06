import { BoardState } from "./board-state";
import { expect } from "chai";

describe('BoardState', function() {
    it('creates from string', function() {
        const input =
            '####\n' +
            '#  #\n' +
            '# O#\n' +
            '#XO#\n' +
            '####\n';
        const boardState = BoardState.createFromString(input);
        expect(boardState.board).to.eql([
            [1,1,1,1],
            [1,0,0,1],
            [1,0,2,1],
            [1,3,2,1],
            [1,1,1,1],
        ]);
    });
});