import { useState } from 'react';
import AddTaskList from './components/AddTaskList.jsx'
import EditTaskList from './components/EditTaskList.jsx'
import ToDoList from './components/ToDoList.jsx'

function App() {

  const [toDoList, setToDoList] = useState([]);
  const [task, setTask] = useState('');
  const [editingTask, setEditingTask] = useState('');
  const [progress, setProgress] = useState(0)
 

  const addTask = () => {
    if (task) {
      let num = toDoList.length + 1;
      let newTask = { id: num, title: task, status: false};
      setToDoList([...toDoList, newTask]);
      setTask('');
    }
  }

  const editTask = () => {
    let filterRecords = [...toDoList].filter(task => task.id !== editingTask.id);
    let updateObject = [...filterRecords, editingTask];
    setToDoList(updateObject);
    setEditingTask('');
  }

  const changeTask = (e) => {
    let newEntry = {
      id: editingTask.id,
      title: e.target.value,
      status: editingTask.status ? true : false
    };
    setEditingTask(newEntry);
  }

  const cancelEditing = () => {
    setEditingTask('');
  }

  const deleteTask = (id) => {
    let tasks = toDoList.filter(task => task.id !== id)

    console.log(progress)
    
    tasks.forEach(task => {
      if(progress > 0 && task) {
        setProgress(progress - 1);
      }
    })
    
    setToDoList(tasks);
    console.log(tasks);
    setEditingTask('');
  }

  const markDone = (id) => {
    let doneTasks = [];
    let task = toDoList.map( task => {

      if (task.id === id) {
        return({...task, status: !task.status});
      }

      return task;
    });

    setToDoList(task);
    setEditingTask('');

    task.map(item => {
      if(item.status === true) {
        doneTasks.push(item);
      }
    })

    setProgress(doneTasks.length);
  }

  const progressBar = () => {
    let num = Math.round(progress / toDoList.length * 100);

    if(num > 0) {
       return num;
    } else {
      return 0;
    }
  }

  return (
    <div className='container'>
      <h2 className='total-title'>My tasks</h2>

      {editingTask && editingTask ? (
        <EditTaskList
          editingTask = {editingTask}
          changeTask = {changeTask}
          editTask = {editTask}
          cancelEditing = {cancelEditing}
        />
      ) : (
        <AddTaskList 
          task = {task}
          setTask = {setTask}
          addTask = {addTask}
        />
      )}
      
      {toDoList && toDoList.length ? 
        <div>
          <div className='counter'>{progress} of {toDoList.length} tasks complete ({progressBar()} %)</div> 
          <div className='progressBar'>
            <div className='progressInput' style={{width : progressBar()}}></div>
          </div>
        </div> : 
        <div className='counter'>No Tasks</div>}
      
      <ToDoList
        toDoList = {toDoList}
        markDone = {markDone} 
        setEditingTask = {setEditingTask}
        deleteTask = {deleteTask}
      />
    </div>
  )
}

export default App;