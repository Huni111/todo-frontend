// App.js
import React from 'react';
import Task from './TaskC';
import { useState, useEffect } from 'react';
import './App.css';



const App = () => {
  const [tasks, setTask] = useState([]);
  const [stored, setStored] = useState('')
  const [error, setError] = useState(null);

///FETCH DATA FROM START:
  const fetchData = async () => {

    try {
      const resp = await fetch('https://todo-list-api-jnl7.onrender.com/');
      const data = await resp.json();
      setTask(data);
      setError(null);

    } catch (err) {
      setError("ERROR FETCHING DATA!");
      setTask(null)
      console.log("ERROR:" + err)
    }

  }

  useEffect(() => {
    fetchData()
  }, [tasks])

///STORE INPUT:
  const storeInput = (event) => {
    const input = event.target.value
    setStored(input)
  }

///ADD NEW ITEM:
const addNew = async(event) => {
  try{
const key = event.key
if(event && key === "Enter") {
  event.preventDefault();
  console.log("enter")

  const resp = await fetch('https://todo-list-api-jnl7.onrender.com/newtask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({task: stored})
  })
  if (!resp.ok) {
    throw new Error(`Failed to POST data: ${resp.statusText}`);
  }

  const data = await resp.json();
  console.log("Server response after POST:", data);
  setTask([...tasks, data.task]);
  setStored('')
  setError(null)
  
}
  }catch (err) {
    setStored(null)
    setError(`ERROR POSTING DATA!: ${err.message}`)
  }
}
///DELETE DATA:

const deleteTask = async(x) => {
  try{ 
    const resp = await fetch(`https://todo-list-api-jnl7.onrender.com/tasks/${x}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })

    fetchData();
  }catch(err) {
    setError("ERROR DELETING DATA:");
    console.log(error+err)

  }
}




///DISPLAY LIST:
  const create = (tas) => {
    return <Task task={tas.task} key={tas._id} delete={deleteTask} id={tas._id}/>
  }

  return (
    <div id="todoapp">
      <h2>Todo Lista</h2>
      <input type="text" id="taskInput" placeholder="Adj hozza uj feladatot!" onChange={storeInput} onKeyDown={addNew} value={stored} />
      <ul id="taskList">{tasks.map(create)}   </ul>
    </div>

  );
};

export default App;
