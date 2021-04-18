
import { isEmpty } from 'lodash';
import React,{useState} from 'react'
import shortid from 'shortid';

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  
  const addTask = (e) => {
    //evitar que recargue la pagina por el submit
    e.preventDefault();
    //validar datos 
    if(isEmpty(task)){
      console.log("Task empty");
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
          <ul className="list-group">
            {
              tasks.map((task) =>(
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button className="btn btn-danger btn.sm float-right mx-2">Eliminar</button>
                  <button className="btn btn-warning btn.sm float-right">Editar</button>
                </li>
              ))
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
           Formulario
          </h4>
          
          <form onSubmit={addTask}>
            <input type="text" className="form-control mb-2" 
            placeholder="Ingrese la tarea" onChange={(text) => setTask(text.target.value)}
            value={task} ></input>
            <button className="btn btn-dark btn-block" 
            type="submit" >Agregar Tarea</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
