const ToDoList = ({ toDoList, markDone, setEditingTask, deleteTask }) => {
  return (
    <>
      {toDoList && toDoList
        .sort((a, b) => a.id > b.id ? 1: -1)
        .map( (task, index) => {
          return (
            <div 
              className="list-wrapper"
              key={task.id}

            >
              <div className="list">
                <input
                  className="checkbox"
                  title='Completed / Not Completed'
                  type="checkbox"
                  onClick={ (e) => markDone(task.id)}
                />

                <div className={task.status ? 'done' : 'active'}>
                  <span className="list-number">{index + 1 + '.'}</span>
                  <div className="list-task">{task.title.trim()}</div>
                </div> 
              </div>
               
              <div className="list-buttons">
               
                {task.status ? null : (
                  <button 
                    className="optional-btn"
                    title='Do you want to edit?' 
                    onClick={ () => setEditingTask({
                      id: task.id, 
                      title: task.title,
                      status: task.status ? true : false 
                    })}
                  >edit</button>
                )}
                
                <button 
                  className="optional-btn"
                  title='Do you want to delete?'
                  onClick={() => deleteTask(task.id)}
                >delete</button>
              </div>  
            </div>
          )
        })
      }  
    </>
  )
} 

export default ToDoList