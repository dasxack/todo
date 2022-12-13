import React from 'react';
import './todo-list.css';
import PropTypes from 'prop-types';

import TodoListItem from '../todo-list-item';

function TodoList({ onDeleted, onToggleDone, dataList, toggleEditer, onItemChange, curFilter }) {
  const elements = dataList.map((item) => {
    const { id, minValue, secValue, ...itemProps } = item;

    return (
      <li className="todo-list-item" key={id}>
        <TodoListItem
          curFilter={curFilter}
          {...itemProps}
          minValue={minValue}
          secValue={secValue}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          toggleEditer={() => toggleEditer(id)}
          onItemChange={(labelInp) => onItemChange(labelInp, id)}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}
export default TodoList;
TodoList.defaultProps = {
  curFilter: 'All',
  minValue: 0,
  secValue: 0,
  id: Math.round(Math.random() * Date.now()),
  dataList: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onItemChange: () => {},
  toggleEditer: () => {},
};
TodoList.propTypes = {
  curFilter: PropTypes.string,
  minValue: PropTypes.number,
  secValue: PropTypes.number,
  id: PropTypes.number,
  dataList: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onItemChange: PropTypes.func,
  toggleEditer: PropTypes.func,
};
