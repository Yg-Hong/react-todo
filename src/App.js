import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import DeleteModal from "./components/DeleteModal";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  console.log("App Component is Rendering...");

  const [todoData, setTodoData] = useState(initialTodoData);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSubmit = (e) => {
    console.log(todoData);
    if (title === "" || content === "") {
      alert("입력된 내용이 없습니다.");
      return;
    }
    if (todoData.length >= 10) {
      alert("todo를 더이상 추가할 수 없습니다.");
      return;
    }

    // form 안에 input을 전송할 때, 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: title,
      content: content,
      date: getNowDate(),
      completed: false,
      deleted: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    /*
        setter에서 이전 state를 가지고오기 위해서는 인수에 함수를 이용해서 사용할 수 있습니다.
        */
    setTitle("");
    setContent("");
  };

  const getNowDate = () => {
    const date = new Date();

    let formatYear = date.getFullYear().toString();
    let formatMonth = (date.getMonth() + 1).toString();
    if (formatMonth.length == 1) {
      formatMonth = "0" + formatMonth;
    }
    let formatDay = date.getDate().toString();
    if (formatDay.length == 1) {
      formatDay = "0" + formatDay;
    }
    let formatHour = date.getHours().toString();
    if (formatHour.length == 1) {
      formatHour = "0" + formatHour;
    }
    let formatMinutes = date.getMinutes().toString();
    if (formatMinutes.length == 1) {
      formatMinutes = "0" + formatMinutes;
    }

    return (
      formatYear +
      "-" +
      formatMonth +
      "-" +
      formatDay +
      " " +
      formatHour +
      ":" +
      formatMinutes
    );
  };

  const showModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-red-50">
      <div className="container w-full p-6 m-4 bg-white rounded shadow">
        <div className="flex justify-between align-bottom mb-5">
          <div className="font-display font-extrabold text-xl">
            My To Do List
          </div>
          <div className="font-display ml-5">add your to-do List!</div>
        </div>

        <Form
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
        <div className="flex-row mb-6 text-sm font-medium">
          <button
            className="h-8 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
            onClick={handleSubmit}
          >
            Plus to-do
          </button>
          <button
            className="float-right h-8 px-6 font-semibold rounded-md bg-gray-500 text-white"
            onClick={showModal}
          >
            Delete All
          </button>{" "}
          {deleteModalOpen && (
            <DeleteModal
              setTodoData={setTodoData}
              setDeleteModalOpen={setDeleteModalOpen}
            />
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <Table
            todoData={todoData}
            setTodoData={setTodoData}
            setTitle={setTitle}
            setContent={setContent}
          />
        </div>
      </div>
    </div>
  );
}
