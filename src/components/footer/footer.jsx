import React from 'react';
import './footer.css';

import PropTypes from 'prop-types';

import TodoFilters from '../todo-filters';

function Footer({ toDo, curFilter, onFiltered, onDeleteCompleted }) {
  return (
    <footer className="footer">
      <span className="toDo-count">To do {toDo} items </span>
      <TodoFilters onFiltered={(newFilter) => onFiltered(newFilter)} curFilter={curFilter} />
      <button className="clear-completed" onClick={onDeleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;
Footer.defaultProps = {
  toDo: 0,
  onDeleteCompleted: () => {},
  curFilter: 'All',
  onFiltered: () => {},
};
Footer.propTypes = {
  toDo: PropTypes.number,
  onDeleteCompleted: PropTypes.func,
  curFilter: PropTypes.string,
  onFiltered: PropTypes.func,
};
