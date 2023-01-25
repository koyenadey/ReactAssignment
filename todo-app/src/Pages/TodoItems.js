import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import classes from "./TodoItems.module.css";

const TodoItems = () => {
  const [dataIsLoading, setDataLoading] = useState(true);
  const [todoDataItems, setToDoDataItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://tododemo-ae5df-default-rtdb.asia-southeast1.firebasedatabase.app/todoitems.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const todoItems = [];

        for (const key in data) {
          const todoItem = {
            id: key,
            ...data[key]
          };

          todoItems.push(todoItem);
        }
        setDataLoading(false);
        setToDoDataItems(todoItems);
        
      });
  }, []);

  if (dataIsLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div className={classes.mainContainer}>
      {todoDataItems.map((item) => (
        <TodoItem
          key={item.id}
          title={item.title}
          deadline={item.deadline}
          status={item.status}
        />
      ))}
      <div className={classes.footerContainer}>
        <div className={classes.statusBarDone}>Done</div>
        <div className={classes.statusBarNotStarted}>Not Started</div>
        <div className={classes.statusBarInProg}>In Progress</div>
      </div>
    </div>
  );
};

export default TodoItems;
