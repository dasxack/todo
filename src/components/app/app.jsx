import React,{useState} from 'react';
import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import Footer from '../footer/footer';
import './app.css';

const App=()=>{
	let maxId = 1
		let maxIdFor = 1
	const createTodoItem=(label, minValue, secValue)=> {
    let minNumber = +minValue;
    let secNumber = +secValue;
    if (secNumber > 60) {
      minNumber += Math.trunc(minNumber / 60);
      secNumber -= Math.trunc(secNumber / 60) * 60;
    }
    return {
      label,
      done: false,
      id: maxId++,
      idFor: maxIdFor++,
      createTime: Date.now(),
      editer: false,
      minValue: minNumber,
      secValue: secNumber,
    };
  }

	const[curFilter,setCurFilter]=useState('All')
	const[todoData,setTodoData]=useState([
      createTodoItem('Completed task', 15, 11),
      createTodoItem('Editing task', 15, 11),
      createTodoItem('Active task', 15, 11),
    ])
		
		
	const onToggleDone = (id) => {
    setTodoData((todoData)=>{
			const idx = todoData.findIndex((el) => el.id === id)
			const oldItem = todoData[idx]
			const newItem = { ...oldItem, done: !oldItem.done }
			const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
			return newArr
		})
  };
	 const deleteItem = (id) => {
    setTodoData((todoData)=>{
			const idx = todoData.findIndex((el) => el.id === id)
			const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return newArr
		})
  };
	const onAddItem = (text, minValue, secValue) => {
    
    const newItem = createTodoItem(text, minValue, secValue);
    setTodoData((todoData)=>{
			const newArray = [...todoData, newItem]
			return newArray
		})
  };
	const changeFilter = (newFilter) => {
    setCurFilter(newFilter);
  };
	const delAllCompleted = () => {
    setTodoData(todoData.filter((e) => !e.done))
  };
	const onItemChange = (label, id) => {
    setTodoData(todoData.map((el) => {
			if (el.id === id) {
				return {
					...el,
					label: label,
					editer: !el.editer,
				};
			}
			return el;
		}),)
  };
	const toggleEditer = (id) => {
    setTodoData(todoData.map((el) => {
			if (el.id === id) {
				return {
					...el,
					editer: !el.editer,
				};
			}
			return el;
		}),)
  };
	const doneCount = todoData.filter((el) => el.done).length;
	const todoCount = todoData.length - doneCount;
	return (
      <section className="todoapp">
        <header className="header">
          <AppHeader />
          <SearchPanel onItemAdded={onAddItem} />
        </header>
        <section className="main">
          <TodoList
            curFilter={curFilter}
            onDeleted={deleteItem}
            onToggleDone={onToggleDone}
            dataList={todoData}
            toggleEditer={toggleEditer}
            onItemChange={onItemChange}
          />
          <Footer
            onDeleteCompleted={delAllCompleted}
            toDo={todoCount}
            onFiltered={(newFilter) => changeFilter(newFilter)}
            curFilter={curFilter}
          />
        </section>
      </section>
    );
}
export default App