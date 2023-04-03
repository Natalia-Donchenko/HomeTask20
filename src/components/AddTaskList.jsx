const AddTaskList = ({ task, setTask, addTask }) => {
  return (
    <div className="addTask">
      <input
        className="task-input"
        placeholder="What do you want to do?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button
        className="addTask-btn"
        onClick={addTask}
      >Add Task</button>
    </div>
  )
} 

export default AddTaskList