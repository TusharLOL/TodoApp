import React, { useEffect, useState } from 'react';
import {AiOutlineDelete,AiOutlineCheck} from 'react-icons/ai';
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArray = [...allTodos];
    updatedTodoArray.push(newTodoItem);
    setAllTodos(updatedTodoArray);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoArray));
    setNewTitle('');
    setNewDescription('');
  }

  const handleDeleteTodo = (index) => {
    let reducedTodoArray = [...allTodos];
    reducedTodoArray.splice(index,1);

    localStorage.setItem('todoList', JSON.stringify(reducedTodoArray));
    setAllTodos(reducedTodoArray);
  }
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodoArray = [...completedTodos];
    reducedTodoArray.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodoArray));
    setCompletedTodos(reducedTodoArray);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }
    
    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleteArr));
  }

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todoList'));
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    } 

  },[]);

  return (
    <div className="App">
      <h1 className='title-1'>Todo List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
             <label>Title</label>
             <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Enter your todo title" />
          </div>
          <div className="todo-input-item">
             <label>Description</label>
             <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Enter the task's description" />
          </div>
          <div className="todo-input-item">
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
        {
        !isCompleteScreen ? (allTodos.map((todo, index) => {
            return (
            <div className="todo-list-item" key={index}>
              <div className='item-text'>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div>
                <AiOutlineDelete className="delete-icon" onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
                <AiOutlineCheck className="check-icon" onClick={()=>{handleComplete(index)}} title="Completed?"/>
              </div>
            </div>
          )})):(
            completedTodos.map((todo, index) => {
              return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <p><small>Completed on : {todo.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className="delete-icon" onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?"/>
                </div>
              </div>
            )})
          )}
          {/* {isCompleteScreen===true && completedTodos.map((todo, index) => {
            return (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p><small>Completed on : {todo.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete className="delete-icon" onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?"/>
              </div>
            </div>
          )})} */}
        </div>
      </div>
    </div>
  );
}

export default App;
