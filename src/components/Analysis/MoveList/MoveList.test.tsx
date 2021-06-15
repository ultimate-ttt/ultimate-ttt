import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { MoveState, Player } from '../../../state/AppState';
import { MoveList } from './MoveList';

const moveStates: MoveState[] = [
  {
    moveNumber: 1,
    player: Player.Cross,
    tilePosition: { x: 0, y: 0 },
    boardPosition: { x: 0, y: 0 },
  },
  {
    moveNumber: 2,
    player: Player.Circle,
    tilePosition: { x: 0, y: 1 },
    boardPosition: { x: 0, y: 0 },
  },
  {
    moveNumber: 3,
    player: Player.Cross,
    tilePosition: { x: 0, y: 0 },
    boardPosition: { x: 0, y: 1 },
  },
].reverse();

test('renders moves', () => {
  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={1}
      onMoveUpwardsInList={() => {}}
      onMoveDownwardsInList={() => {}}
    />,
  );

  moveStates.map((value) => {
    const regex = new RegExp(
      `move ${value.moveNumber} board ` +
        `${value.boardPosition.x}\/${value.boardPosition.y} ` +
        `- tile ${value.tilePosition.x}\/${value.tilePosition.y}`,
      'i',
    );
    expect(screen.getByRole('button', { name: regex })).toBeInTheDocument();
  });
});

test('renders currentMove as activated', () => {
  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={2}
      onMoveUpwardsInList={() => {}}
      onMoveDownwardsInList={() => {}}
    />,
  );

  const moveTwo = screen.getByRole('button', { name: /move 2/i });
  expect(moveTwo.className).toMatch(/activated/);
});

test('allows using buttons to move upwards in list', () => {
  const moveUpwardsInList = jest.fn();
  const moveDownwardsInList = jest.fn();

  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={3}
      onMoveUpwardsInList={moveUpwardsInList}
      onMoveDownwardsInList={moveDownwardsInList}
    />,
  );

  const moveOne = screen.getByRole('button', { name: /move 1/i });
  const moveTwo = screen.getByRole('button', { name: /move 2/i });

  userEvent.click(moveOne);

  expect(moveUpwardsInList).toHaveBeenCalledWith(2);
  expect(moveDownwardsInList).not.toHaveBeenCalled();

  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={3}
      onMoveUpwardsInList={moveUpwardsInList}
      onMoveDownwardsInList={moveDownwardsInList}
    />,
  );

  userEvent.click(moveTwo);

  expect(moveUpwardsInList).toHaveBeenCalledWith(1);
  expect(moveDownwardsInList).not.toHaveBeenCalled();
});

test('allows using buttons to move downwards in list', () => {
  const moveUpwardsInList = jest.fn();
  const moveDownwardsInList = jest.fn();

  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={1}
      onMoveUpwardsInList={moveUpwardsInList}
      onMoveDownwardsInList={moveDownwardsInList}
    />,
  );

  const moveTwo = screen.getByRole('button', { name: /move 2/i });
  const moveThree = screen.getByRole('button', { name: /move 3/i });

  userEvent.click(moveThree);
  expect(moveDownwardsInList).toHaveBeenCalledWith(2);
  expect(moveUpwardsInList).not.toHaveBeenCalled();

  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={1}
      onMoveUpwardsInList={moveUpwardsInList}
      onMoveDownwardsInList={moveDownwardsInList}
    />,
  );

  userEvent.click(moveTwo);
  expect(moveDownwardsInList).toHaveBeenCalledWith(1);
  expect(moveUpwardsInList).not.toHaveBeenCalled();
});

test('doesnt call callbacks when clicking on active item', () => {
  const moveUpwardsInList = jest.fn();
  const moveDownwardsInList = jest.fn();

  render(
    <MoveList
      reversedMoves={moveStates}
      activatedMove={1}
      onMoveUpwardsInList={moveUpwardsInList}
      onMoveDownwardsInList={moveDownwardsInList}
    />,
  );

  const moveOne = screen.getByRole('button', { name: /move 1/i });
  userEvent.click(moveOne);

  expect(moveDownwardsInList).not.toHaveBeenCalled();
  expect(moveUpwardsInList).not.toHaveBeenCalled();
});
