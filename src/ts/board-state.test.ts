import { BoardState } from "./board-state";
import { expect } from "chai";

describe('BoardState.createFromString', function() {
    it('creates the correct board', function() {
        const input =
            '#####\n' +
            '#  ##\n' +
            '# O #\n' +
            '#XO #\n' +
            '#####\n';
        const boardState = BoardState.createFromString(input);
        expect(boardState.board).to.eql([
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]);
    });
});

describe('BoardState.createShifted', function() {
    it('shifts piece up', function() {
        const boardState = new BoardState({board: [
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]});
        const shifted = boardState.createShifted(2, {x: 0, y: -1});
        expect(shifted).to.exist;
        expect(shifted!.board).to.eql([
            [1,1,1,1,1],
            [1,0,2,1,1],
            [1,0,2,0,1],
            [1,3,0,0,1],
            [1,1,1,1,1],
        ]);
    });

    it('shifts piece right', function() {
        const boardState = new BoardState({board: [
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]});
        const shifted = boardState.createShifted(2, {x: 1, y: 0});
        expect(shifted).to.exist;
        expect(shifted!.board).to.eql([
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,0,2,1],
            [1,3,0,2,1],
            [1,1,1,1,1],
        ]);
    });

    it("doesn't shift pieces into walls", function() {
        const boardState = new BoardState({board: [
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]});
        const shifted = boardState.createShifted(2, {x: 0, y: 1});
        expect(shifted).to.not.exist;
    });

    it("doesn't shift pieces into other pieces", function() {
        const boardState = new BoardState({board: [
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]});
        const shifted = boardState.createShifted(2, {x: -1, y: 0});
        expect(shifted).to.not.exist;
    });
});