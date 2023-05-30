import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Rows from "./Rows";

function Table({ todoData, setTodoData }) {
  console.log("Table Component is Rendering...");

  const columns = [
    { name: "No", size: 10 },
    { name: "Clear", size: 5 },
    { name: "Title", size: 25 },
    { name: "Content", size: 30 },
    { name: "Date of register", size: 20 },
    { name: "Edit", size: 10 },
    { name: "Delete", size: 10 },
  ];

  const DummyData = Array(11)
    .fill()
    .map(() => ({
      id: Math.random(),
      Title: "",
      Content: "",
      Date: "",
      Edit: "",
      Delete: "",
    }));
  const displayedData = [...todoData, ...DummyData].slice(0, 10);

  const handleEnd = (result) => {
    console.log("result : ", result);

    //목적지가 없으면(event 취소) 이 함수를 종료합니다.
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData를 생성한다.
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 지워준다.
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 해준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <table class="table-fixed border-collapse min-w-full text-sm font-light">
      <thead class="border-b font-medium dark:border-neutral-500">
        <tr class="bg-slate-200">
          {columns.map((column) => (
            <th
              key={column.name}
              class="px-6 py-4"
              style={{ width: column.size + "em" }}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {displayedData.map((data, index) => (
          <Rows
            key={data.id}
            data={data}
            index={index}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
