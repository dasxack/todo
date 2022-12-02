import React from 'react'
import './todo-list-item.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class TodoListItem extends React.Component {
  state = {
    done: false,
    labelInp: this.props.label,
    min: this.props.minValue,
    sec: this.props.secValue,
    isCounting: false,
  }
  componentWillUnmount() {
    clearInterval(this.counterID)
  }
  changeValue = (e) => {
    this.setState({
      labelInp: e.target.value,
    })
  }

  onSubmitInput = (e) => {
    e.preventDefault()
    if (this.state.labelInp !== '') {
      this.props.onItemChange(this.state.labelInp)
    }
  }
  minDecrement = () => {
    const { min } = this.state
    this.setState({
      min: min - 1,
      sec: 59,
    })
  }
  secDecrement = () => {
    const { min, sec, isCounting } = this.state

    if (min === 0 && sec === 0 && isCounting === true) {
      clearInterval(this.counterID)
      this.setState({
        isCounting: false,
      })
    }
    if (sec > 0) {
      this.setState({
        sec: sec - 1,
        isCounting: true,
      })
    } else {
      this.minDecrement()
    }
  }
  handlePause = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: false })
    clearInterval(this.counterID)
  }

  handleStart = (event) => {
    event.stopPropagation()
    this.setState({ isCounting: true })
    this.counterID = setInterval(() => {
      this.secDecrement()
    }, 1000)
  }
  render() {
    const { min, sec, isCounting } = this.state
    const {
      label,
      idFor,
      onDeleted,
      onToggleDone,
      done,
      editer,
      createTime,
      toggleEditer,
      curFilter,
    } = this.props

    let classNames = 'title'

    if (done) {
      classNames += ' done'
    }
    const buttons = !isCounting ? (
      <button className="icon icon-play" onClick={this.handleStart}></button>
    ) : (
      <button className="icon icon-pause" onClick={this.handlePause}></button>
    )
    return (
      <>
        <div
          hidden={
            (done && curFilter === 'Active') ||
            (!done && curFilter === 'Completed')
          }
        >
          {editer ? (
            <form onSubmit={this.onSubmitInput}>
              <input
                type="text"
                className="edit"
                value={this.state.labelInp}
                onChange={this.changeValue}
              />
            </form>
          ) : (
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                id={idFor}
                onClick={onToggleDone}
                defaultChecked={done}
              />
              <label htmlFor={idFor}>
                <span className={classNames}>{label}</span>
                <span className="description">
                  {buttons}
                  {min}:{sec}
                </span>
                <span className="created">
                  {formatDistanceToNow(createTime)}
                </span>
              </label>
              <button
                className="icon icon-edit"
                onClick={toggleEditer}
              ></button>
              <button className="icon icon-destroy" onClick={onDeleted} />
            </div>
          )}
        </div>
      </>
    )
  }
}
TodoListItem.defaultProps = {
  curFilter: 'All',
  label: '',
  minValue: 0,
  secValue: 0,
  done: false,
  idFor: 0,
  onDeleted: () => {},
  onToggleDone: () => {},
  createTime: Date.now(),
  toggleEditer: () => {},
  onItemChange: () => {},
}
TodoListItem.propTypes = {
  curFilter: PropTypes.string,
  minValue: PropTypes.number,
  secValue: PropTypes.number,
  label: PropTypes.string,
  idFor: PropTypes.number,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  createTime: PropTypes.number,
  toggleEditer: PropTypes.func,
  editer: PropTypes.bool,
  onItemChange: PropTypes.func,
}
