import React, { useEffect, useRef } from "react";
import styles from "./DeleteModal.module.css";

function DeleteModal({ setTodoData, setDeleteModalOpen }) {
  console.log("DeleteModal Component is Rendering...");

  // Cancel로 모달 끄기
  const CancelModal = () => {
    setDeleteModalOpen(false);
  };

  // window.addEventListener("click", (e) => {
  //   e.target === modal_background ? CancelModal() : fasle;
  // });

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        CancelModal();
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });

  //Confirm으로 전체 삭제 하기
  const ConfirmModal = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));

    setDeleteModalOpen(false);
  };

  return (
    <div ref={modalRef} role="alert" className={styles.container}>
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Caution!
      </div>
      <div className="flex justify-between border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Your all Todo will be removed.</p>
        <div className="inline-flex">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={ConfirmModal}
          >
            Confirm
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={CancelModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
//{deleteflag}
