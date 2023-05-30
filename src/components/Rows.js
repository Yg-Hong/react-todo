import React, { useState } from "react";
import styles from "./Rows.module.css";
import { BsFillXSquareFill } from "react-icons/bs";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

function Rows({ data, index, todoData, setTodoData }) {
  console.log("Rows Component is Rendering...");

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data.title);
  const [editedContent, setEditedContent] = useState(data.content);

  const handleDeleteTodo = (id) => {
    let newTododata = todoData.filter((data) => data.id !== id);
    setTodoData(newTododata);

    localStorage.setItem("todoData", JSON.stringify(newTododata));
  };

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  const handleEditTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditContent = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let editedId = data.id;

    let newTodoData = todoData.map((data) => {
      if (data.id === editedId) {
        data.title = editedTitle;
        data.content = editedContent;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(data.title);
    setEditedContent(data.content);

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr
        key={data.id}
        class={`${
          data.completed ? "bg-gray-400" : styles.input
        } border-b dark:border-neutral-500`}
      >
        <td class="whitespace-nowrap px-6 py-2 font-medium text-right">
          {index + 1}
        </td>
        <td class="whitespace-nowrap px-6 py-2">
          {data.date ? (
            <input
              type="checkbox"
              onChange={() => handleCompleteChange(data.id)}
              checked={data.completed ? "true" : ""}
            />
          ) : (
            ""
          )}
        </td>
        <td class="whitespace-nowrap px-6 py-2 text-center">
          <input
            value={editedTitle}
            onChange={handleEditTitle}
            disabled={data.completed ? true : false}
            class={`${styles.input} ${
              data.completed ? "bg-gray-400" : "w-full bg-yellow-50"
            }`}
          />
        </td>
        <td class="whitespace-nowrap px-6 py-2">
          <input
            value={editedContent}
            onChange={handleEditContent}
            disabled={data.completed ? true : false}
            class={`${styles.input} ${
              data.completed ? "bg-gray-400" : "w-full bg-yellow-50"
            }`}
          />
        </td>
        <td class="whitespace-nowrap px-6 py-2 text-center">{data.date}</td>
        <td class="whitespace-nowrap px-6 py-2 text-center">
          {data.date ? (
            <button onClick={handleSubmit}>
              <AiFillSave />
            </button>
          ) : (
            ""
          )}
          {data.date ? (
            <button onClick={handleCancel}>
              <FcCancel />
            </button>
          ) : (
            ""
          )}
        </td>
        <td class="whitespace-nowrap px-6 py-2 text-center">
          {data.date ? (
            <button onClick={() => handleDeleteTodo(data.id)}>
              <BsFillXSquareFill />
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  } else {
    return (
      <tr
        key={data.id}
        class={`${
          data.completed ? "bg-gray-400" : styles.row
        } border-b dark:border-neutral-500`}
      >
        <td class="whitespace-nowrap px-6 py-2 font-medium text-right">
          {index + 1}
        </td>
        <td class="whitespace-nowrap px-6 py-2 text-center">
          {data.date ? (
            <input
              type="checkbox"
              onChange={() => handleCompleteChange(data.id)}
              checked={data.completed ? "true" : ""}
            />
          ) : (
            ""
          )}
        </td>
        <td class="whitespace-nowrap px-6 py-2">
          <input
            value={data.title}
            disabled
            class={`${styles.input} ${
              data.completed ? "bg-gray-400" : "w-full"
            }`}
          />
        </td>
        <td class="whitespace-nowrap px-6 py-2">
          <input
            value={data.content}
            disabled
            class={`${styles.input} ${
              data.completed ? "bg-gray-400" : "w-full"
            }`}
          />
        </td>
        <td class="whitespace-nowrap px-6 py-2 text-center">{data.date}</td>
        <td class="whitespace-nowrap px-6 py-2 text-center">
          {data.date ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={data.completed ? true : false}
            >
              <AiFillEdit />
            </button>
          ) : (
            ""
          )}
        </td>
        <td class="whitespace-nowrap px-6 py-2 text-center">
          {data.date ? (
            <button onClick={() => handleDeleteTodo(data.id)}>
              <BsFillXSquareFill />
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  }
}

export default Rows;

//AiFillSave
//FcCancel
