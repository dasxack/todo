import React, { useState } from 'react';
import './search-panel.css';
import PropTypes from 'prop-types';
const SearchPanel = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');
  const onLabelChange = (e) => {
    if (e.target.name === 'label') {
      setLabel(e.target.value);
    }
    if (e.target.name === 'minValue') {
      setMinValue(e.target.value);
    }
    if (e.target.name === 'secValue') {
      setSecValue(e.target.value);
    }
  };

  const onSubmit = (e) => {
    const trimDescription = label.replace(/ +/g, ' ').trim();
    if (e.key === 'Enter') {
      if (trimDescription === '') {
        onItemAdded('Нет Задачи', minValue, secValue);
      } else {
        onItemAdded(label, minValue, secValue);
      }
      setLabel('');
      setMinValue('');
      setSecValue('');
    }
  };
  return (
    <form className="new-todo-form" onKeyDown={onSubmit}>
      <input
        type="text"
        className="new-todo"
        name="label"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        name="minValue"
        placeholder="Min"
        value={minValue}
        onChange={onLabelChange}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        name="secValue"
        placeholder="Sec"
        onChange={onLabelChange}
        value={secValue}
      />
    </form>
  );
};
SearchPanel.defaultProps = {
  onItemAdded: () => {},
};
SearchPanel.propTypes = {
  onItemAdded: PropTypes.func,
};
export default SearchPanel;
