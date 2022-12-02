import React from 'react';

import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel/search-panel';
import Footer from '../footer/footer';
import './app.css';

export default class App extends React.Component {
  maxId = 1;

  maxIdFor = 1;

  state = {
    curFilter: 'All',
    todoData: [
      this.createTodoItem('Completed task', 15, 11),
      this.createTodoItem('Editing task', 15, 11),
      this.createTodoItem('Active task', 15, 11),
    ],
  };

  getFilteredData = () => {
    switch (this.state.curFilter) {
      case 'All':
        return this.state.todoData;
      case 'Active':
        return this.state.todoData.filter((el) => !el.done);
      case 'Completed':
        return this.state.todoData.filter((el) => el.done);
      default:
        return this.state.todoData;
    }
  };

  createTodoItem(label, minValue, secValue) {
    let minNumber = +minValue;
    let secNumber = +secValue;
    if (secNumber > 60) {
      minNumber += Math.trunc(minNumber / 60);
      secNumber -= Math.trunc(secNumber / 60) * 60;
    }
    return {
      label,
      done: false,
      id: this.maxId++,
      idFor: this.maxIdFor++,
      createTime: Date.now(),
      editer: false,
      minValue: minNumber,
      secValue: secNumber,
    };
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return { todoData: newArr };
    });
  };

  onAddItem = (text, minValue, secValue) => {
    console.log(text, minValue, secValue);
    const newItem = this.createTodoItem(text, minValue, secValue);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  changeFilter = (newFilter) => {
    this.setState({ curFilter: newFilter });
  };

  delAllCompleted = () => {
    this.setState({ todoData: this.state.todoData.filter((e) => !e.done) });
  };

  onItemChange = (label, id) => {
    this.setState({
      todoData: this.state.todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label: label,
            editer: !el.editer,
          };
        }
        return el;
      }),
    });
  };

  toggleEditer = (id) => {
    this.setState({
      todoData: this.state.todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            editer: !el.editer,
          };
        }
        return el;
      }),
    });
  };

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    return (
      <section className="todoapp">
        <header className="header">
          <AppHeader />
          <SearchPanel onItemAdded={this.onAddItem} />
        </header>
        <section className="main">
          <TodoList
            curFilter={this.state.curFilter}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            dataList={this.state.todoData}
            toggleEditer={this.toggleEditer}
            onItemChange={this.onItemChange}
          />
          <Footer
            onDeleteCompleted={this.delAllCompleted}
            toDo={todoCount}
            onFiltered={(newFilter) => this.changeFilter(newFilter)}
            curFilter={this.state.curFilter}
          />
        </section>
      </section>
    );
  }
}
