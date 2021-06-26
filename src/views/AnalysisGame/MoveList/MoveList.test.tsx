import * as React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './MoveList.story';
import { movesForBoardWithThreeMovesMock } from '../../../mocks/board';
const { Default } = composeStories(stories);

test('renders moves', () => {
  render(<Default />);

  movesForBoardWithThreeMovesMock.map((value) => {
    const regex = new RegExp(
      `move ${value.moveNumber} board ` +
        `${value.boardPosition.x}\/${value.boardPosition.y} ` +
        `- tile ${value.tilePosition.x}\/${value.tilePosition.y}`,
      'i',
    );
    expect(screen.getByRole('button', { name: regex })).toBeInTheDocument();
  });

  const moveTwo = screen.getByRole('button', { name: /move 2/i });
  expect(moveTwo.className).toMatch(/activated/);
});

test('allows using buttons to move upwards in list', () => {
  const moveDownwardsInList = jest.fn();
  const moveUpwardsInList = jest.fn();

  render(
    <Default
      activatedMove={3}
      onMoveDownwardsInList={moveDownwardsInList}
      onMoveUpwardsInList={moveUpwardsInList}
    />,
  );

  const moveOne = screen.getByRole('button', { name: /move 1/i });

  userEvent.click(moveOne);

  expect(moveUpwardsInList).toHaveBeenCalledWith(2);
  expect(moveDownwardsInList).not.toHaveBeenCalled();
});

test('allows using buttons to move downwards in list', () => {
  const moveDownwardsInList = jest.fn();
  const moveUpwardsInList = jest.fn();

  render(
    <Default
      activatedMove={1}
      onMoveDownwardsInList={moveDownwardsInList}
      onMoveUpwardsInList={moveUpwardsInList}
    />,
  );

  const moveThree = screen.getByRole('button', { name: /move 3/i });

  userEvent.click(moveThree);
  expect(moveDownwardsInList).toHaveBeenCalledWith(2);
  expect(moveUpwardsInList).not.toHaveBeenCalled();
});

test('doesnt call callbacks when clicking on active item', () => {
  const moveUpwardsInList = jest.fn();
  const moveDownwardsInList = jest.fn();

  render(<Default />);

  const moveOne = screen.getByRole('button', { name: /move 2/i });
  userEvent.click(moveOne);

  expect(moveDownwardsInList).not.toHaveBeenCalled();
  expect(moveUpwardsInList).not.toHaveBeenCalled();
});
