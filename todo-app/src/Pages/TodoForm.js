import classes from "./TodoForm.module.css";
import {useRef} from 'react';

const TodoForm = (props) => {
    const titleInputRef = useRef();
    const deadlineInputRef = useRef();
    const statusInputRef = useRef();
    const formRef = useRef();


    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDeadline = deadlineInputRef.current.value;
        const enteredStatus = statusInputRef.current.value;

        const todoItem = {
            title: enteredTitle,
            deadline: enteredDeadline,
            status: enteredStatus
        };
        
        props.onAddTodoItem(todoItem);
    }

    function cancelHandler(event){
        event.preventDefault();
        formRef.current.reset();
    }

  return (
    <div className={classes.mainContainer}>
      <form className={classes.formContainer} ref={formRef}>
        <div className={classes.header}>
          <p className={classes.headerText}>Add new todo</p>
        </div>
        <div className={classes.formControls}>
          <input
            className={classes.title}
            type="text"
            id="title"
            placeholder="Title" ref={titleInputRef}
          />
        </div>
        <div className={classes.formControls}>
          <input
            className={classes.deadline}
            type="text"
            id="deadline"
            placeholder="DeadLine" ref={deadlineInputRef}
          />
        </div>
        <div className={classes.formControls}>
          <select className={classes.status} name="Status" placeholder="Status" ref={statusInputRef}>
            <option value="select">Select</option>
            <option value="Done">Done</option>
            <option value="Not Started">Not Started</option>
            <option value="In progress">In progress</option>
          </select>
        </div>
        <div className={classes.buttonClass}>
          <button className={classes.Add} onClick={submitHandler}>
            Add
          </button>
          <button className={classes.Cancel} onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
