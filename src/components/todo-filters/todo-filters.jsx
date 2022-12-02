import React from 'react'
import './todo-filters.css'
import PropTypes from 'prop-types'

function TodoFilters(props) {
  const { curFilter, onFiltered } = props
  const btnNames = ['All', 'Active', 'Completed']
  return (
    <ul className="filters">
      {btnNames.map((el) => (
        <li key={el}>
          <label className={curFilter === el ? 'selected' : null}>
            <input type="radio" name="radio" onClick={() => onFiltered(el)} />
            {el}
          </label>
        </li>
      ))}
    </ul>
  )
}
export default TodoFilters
TodoFilters.defaultProps = {
  curFilter: 'All',
  onFiltered: () => {},
}
TodoFilters.propTypes = {
  curFilter: PropTypes.string,
  onFiltered: PropTypes.func,
}
