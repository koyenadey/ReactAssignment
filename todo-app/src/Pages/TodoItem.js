import classes from './TodoItem.module.css';

const TodoItem = (props) => {

  const classNames = [classes.color];

  if (props.status === "Done") {
    classNames.push(classes.statusGreen);
  }
  else if(props.status === "Not Started"){
    classNames.push(classes.statusSalmon);
  }
  else if(props.status === "In progress"){
    classNames.push(classes.statusYellow);
  }

  return (
    <div className={classes.rowContainer}>
      <div className={classNames.join(' ')}>
        <p> </p>
      </div>
      <div className={classes.contents}>
        <p className={classes.titleContainer}>{props.title}</p>
        <p className={classes.deadlineContainer}>DeadLine:{props.deadline}</p>
      </div>
    </div>
  );
};

export default TodoItem;
