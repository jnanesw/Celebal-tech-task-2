import { useState } from "react";
import { v4 } from "uuid";


const Inputfield = ()=>{
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editedTask, setEditedTask] = useState('');

    function NewListUpdate(event){
        setNewTask(event.target.value);
        console.log(newTask)
    }
    function TodosUpdate(event){
        event.preventDefault();
        if(newTask === ""){
            alert("Enter your task");
            return;
        }
        
        const newTodos = [...todos, {task:newTask, id:v4(), isEditing:todos.isEditing}]
        setTodos(newTodos);
        setNewTask('');
        console.log(todos)
    }

    function IsEditingUpdate(key) {

        setTodos(todos.map((item)=>{
            if (item.id === key ) {
                return {...item, task : editedTask, isEditing:!item.isEditing};
            } 
            else{
                    return item;
            }
        }));
    }
  

    function SaveUpdate(key){
        if(!editedTask){
            alert("Enter your task");
            return;
        }
        setTodos(todos.map((item)=>{
            if (item.id === key ){
                return {...item, task : editedTask, isEditing:false };
            }
            else{
                return item;
            }

        }))
    }

    function DeleteTodo(key){
        setTodos(todos.map((item)=>{
            if (item.id === key ){
                return {};
            }
            else{
                return item;
            }

        }))
    }

    return(
        <div className="input-field">
            <form>
                <input type="text" id="input" value={newTask} onChange={NewListUpdate} placeholder="what's the new task"/>
                <button onClick={TodosUpdate}>Add Task</button>
            </form>
            {todos.length !== 0 ?(
                <ul>
                    {
                        todos.map((item, index)=>{
                            return(<div id="edit" key={index}>
                                           {
                                           item.isEditing !== true?
                                           (<>
                                                {item.task?(<div className="displaying-items">
                                                        <li id="new-item">{item.task}</li>
                                                        <div id="button-container">
                                                            <button id="edit" onClick={()=>{IsEditingUpdate(item.id)}}>Edit</button>
                                                            <button id="edit2" onClick={()=>DeleteTodo(item.id)}>Delete</button>
                                                        </div>
                                                    </div>):(null)
                                                }
                                            </>
                                            ):(<div id="editing-text">
                                                <input type="text" onChange={(event)=>{setEditedTask(event.target.value)}} />
                                                <button id="save" onClick={()=>{SaveUpdate(item.id)}}>Save</button>
                                            </div>
                                            )
                                           }
                                </div>)
                        })
                    }
                </ul>
                ):(null)
            }
        </div>
    )
}

export default Inputfield;