
import { isEmpty, size } from 'lodash';
import React,{useState} from 'react'
import shortid from 'shortid';

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = () =>{
    let isValid = true;
    setError(null);

    if(isEmpty(task)){
      setError("Debes ingresar una tarea");
       isValid = false;
     }
     return isValid;
  }
  const addTask = (e) => {
    //evitar que recargue la pagina por el submit
    e.preventDefault();
    //validar datos  si no es valido regresar 
    if(!validForm()){
     // console.log("Task empty");
      return
    }

    const newTask = {
      //         el metodo generate genera un codigo alfa numerico que no se repite 
      id: shortid.generate(),
      name: task
    }
    //se agrega nueva tarea
    setTasks([...tasks, newTask])
    //console.log("Ok")
    setTask("");
    
  }

  const deleteTask = (id) => {
    //                 filtrat todas las tareas donde las  tareas todos los id diferentes al id que eliminaste
    const filteredTasks = tasks.filter(task => task.id !== id )
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  const saveTask = (e) => {
    e.preventDefault()
    //validar datos  si no es valido regresar 
    if(!validForm()){
      // console.log("Task empty");
        return
      }

    //por cada tarea se va a iterar un item y preguntar si el item.id == id entonces remplazar ese objeto por el id y 
    //el nombre lo remplazas por el nombre que se capturo en caso contrario se devuelve el mismo objeto item
    const editedTask = tasks.map(item => item.id === id ? { id, name : task } : item)
    setTasks(editedTask)
    setEditMode(false)
    setTask("")
    setId("")
  }

  return (
    <div className="container mt-5">
      <div className="container mt-5">
      <h1>Tareas 2.0</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">
            Lista de Tareas
          </h4>
          {
            size(tasks) == 0 ? (<li className="list-group-item"> Aun no hay tareas programadas</li>) : 
            (
              <ul className="list-group">
                {
                  tasks.map((task) => (
                    <li className="list-group-item" key={task.id}>
                      <span className="lead">{task.name}</span>
                      <button className="btn btn-danger btn.sm float-right mx-2" 
                      onClick={() => deleteTask(task.id)}>Eliminar</button>
                      <button className="btn btn-warning btn.sm float-right"
                      onClick={() => editTask(task)}>Editar</button>
                    </li>
                  ))
                }

              </ul>
            )
          }   
        </div>
        <div className="col-4">
          <h4 className="text-center">
            { editMode ? "Modificar Tarea" : "Agregar Tarea" }
          </h4>
          
          <form onSubmit={ editMode ? saveTask : addTask}>
           {
              error && <span className="text-danger mb-2">{error} </span>
            }
            <input type="text" className="form-control mb-2" 
            placeholder="Ingrese la tarea" onChange={(text) => setTask(text.target.value)}
            value={task} ></input>
           
            <button className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" }
            type="submit" >{ editMode ? "Guardar" : "Agregar" }</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
