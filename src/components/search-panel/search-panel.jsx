import React from 'react';
import './search-panel.css';
import PropTypes from 'prop-types';
export default class SearchPanel extends React.Component {
  state = {
    label: '',
    minValue: '',
    secValue: '',
  };

  onLabelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label, minValue, secValue } = this.state;
    const trimDescription = label.replace(/ +/g, ' ').trim();
    if (e.key === 'Enter') {
      if (trimDescription === '') {
        this.props.onItemAdded('Нет Задачи', minValue, secValue);
      } else {
        this.props.onItemAdded(label, minValue, secValue);
      }
      this.setState({
        label: '',
        minValue: '',
        secValue: '',
      });
    }
  };

  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          name="label"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="minValue"
          placeholder="Min"
          onChange={this.onLabelChange}
          value={this.state.minValue}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="secValue"
          placeholder="Sec"
          onChange={this.onLabelChange}
          value={this.state.secValue}
        />
      </form>
    );
  }
}

SearchPanel.defaultProps = {
  onItemAdded: () => {},
};
SearchPanel.propTypes = {
  onItemAdded: PropTypes.func,
};
