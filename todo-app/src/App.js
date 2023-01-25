import "./index.css";
import { useState } from "react";
import TodoForm from "./Pages/TodoForm";
import TodoItems from "./Pages/TodoItems";

function App() {
  const [formIsOpen, setIsFormVisible] = useState(false);
  const [alltodoIsVisible,setTodosVisible] = useState(false);

  function addItemHandler(todoItemData) {
    fetch(
      "https://tododemo-ae5df-default-rtdb.asia-southeast1.firebasedatabase.app/todoitems.json",
      {
        method: "POST",
        body: JSON.stringify(todoItemData),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(()=>{
      setIsFormVisible(false);
      setTodosVisible(true);
    });
  }

  function buttonClickhandler() {
    setIsFormVisible(true);
    setTodosVisible(false);
  }
  return (
    <div>
      <input
        className="button"
        type="button"
        value="Add a new todo"
        onClick={buttonClickhandler}
      />
      {formIsOpen ? <TodoForm onAddTodoItem={addItemHandler} /> : null}
      {alltodoIsVisible ? <TodoItems /> : null}
    </div>
  );
}

export default App;
