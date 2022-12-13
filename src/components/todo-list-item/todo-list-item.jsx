import React,{useState,useEffect} from 'react'
import './todo-list-item.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'


const TodoListItem=({curFilter,editer,idFor,onToggleDone,minValue,secValue,onDeleted,toggleEditer,onItemChange,label,done,createTime})=>{
	
	
	
	const[isCounting,setIsCounting]=useState(false)
	const[min,setMin]=useState(minValue)
	const[sec,setSec]=useState(secValue)
	const[labelInp,setLabelInp]=useState(label)
	useEffect(()=>{
		const interval=setInterval(()=>{
			
			isCounting && secDecrement()
			
			
			 
		},1000)
		return ()=>{
			clearInterval(interval)
		}
	},[isCounting])
	let classNames = 'title'

    if (done) {
      classNames += ' done'
    }
		
		const changeValue=(e)=>{
			
			setLabelInp(e.target.value)
			
		}
		
		 
		const onSubmitInput = (e) => {
			e.preventDefault()
			if (labelInp !== '') {
				onItemChange(labelInp)
			}
		}
		const minDecrement = () => {
		
			setMin((min)=>min>=1?min-1:stopMin())
			setSec(59)
		
const stopMin=()=>{
	setIsCounting(false)
	setMin(0)
	setSec(0)
}
		
		}
		const secDecrement = () => {
				if (min === 0 && sec === 0 && isCounting === true) {
					setIsCounting(false)
				}
				if (sec > 0) {
					setSec((sec)=>sec>=1?sec-1:minDecrement())
				} 
		}
		const handlePause = (event) => {
			setIsCounting(false)
		}
		const handleStart = (event) => {
			setIsCounting(true)	
		}
		const buttons = !isCounting ? (
      <button className="icon icon-play"onClick={handleStart} ></button>
    ) : (
      <button className="icon icon-pause" onClick={handlePause}></button>
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
            <form onSubmit={onSubmitInput}>
              <input
                type="text"
                className="edit"
                value={labelInp}
                onChange={changeValue}
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
export default TodoListItem
