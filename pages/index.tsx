import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectTodosType,
  AddToDo,
  RemooveToDo,
  ToggleStatus,
  RemoveCompeleted,
  EditText,
  ToggleDisable,
} from "../store/todo";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [todoText, setTodoText] = useState("");
  const todos = useSelector(SelectTodosType);
  const [todoFilter, setTodoFilter] = useState(todos);
  const [onlyActive, setOnlyActive] = useState(false);

  const dispatch = useDispatch();

  const AddToList = (event) => {
    event.preventDefault();
    dispatch(AddToDo(todoText));
    setTodoText("");
  };

  useEffect(() => {
    if (onlyActive) {
      const activeTodos = todos.filter(({ status }) => status !== true);
      setTodoFilter(activeTodos);
    } else {
      setTodoFilter(todos);
    }
  }, [todos,onlyActive]);

  return (
    <div>
      <Head>
        <title>Snapp Shop App</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.header}>TODO</h1>

        <ul className={styles.list}>
          <li className={styles.listHeader}>
            {todos.length === 0
              ? "Add Something Todo!"
              : "What Needs To Be Done!"}
          </li>
          {todoFilter.map(({ id, status, text, disable }) => (
            <li key={id}>
              <span>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => dispatch(ToggleStatus(id))}
                />
                {disable ? (
                  <span onDoubleClick={() => dispatch(ToggleDisable(id))}>
                    {text}
                  </span>
                ) : (
                  <input
                    type="text"
                    className={styles.listInput}
                    ref={(input) => input && input.focus()}
                    value={text}
                    onChange={(e) =>
                      dispatch(EditText({ id: id, text: e.target.value }))
                    }
                    onBlur={() => dispatch(ToggleDisable(id))}
                  />
                )}
              </span>
              {disable && (
                <span
                  className={styles.listspan}
                  onClick={() => dispatch(RemooveToDo(id))}
                >
                  X
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.listfooter}>
          <div>{todos.length} items left</div>
          <div className="cursor">
            <span onClick={()=>setOnlyActive(false)}>All</span>{" "}
            <span onClick={()=>setOnlyActive(true)}>Active</span>
          </div>
          <div
            className={styles.clear}
            onClick={() => dispatch(RemoveCompeleted())}
          >
            Clear completed
          </div>
        </div>
        <form onSubmit={AddToList}>
          <input
            className={styles.input}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="submit" value="add">
            add
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
