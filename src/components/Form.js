import React from "react";

function Form({ title, content, setTitle, setContent, handleSubmit }) {
  console.log("Form Component is Rendering...");

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  return (
    <form>
      <div className="flex justify-between">
        <label for="title" className="font-form">
          Title
        </label>
        <input
          id="title"
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-5/6 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-2 mb-3 ring-1 ring-slate-200 shadow-sm"
          type="text"
          name="value"
          placeholder="Leave a title here"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="flex justify-between">
        <label for="content" className="font-form col-start-1">
          Content
        </label>
        <textarea
          id="content"
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-5/6 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-2 mb-3 ring-1 ring-slate-200 shadow-sm"
          name="value"
          rows="2"
          placeholder="Leave a content here"
          value={content}
          onChange={handleContentChange}
        />
      </div>
    </form>
  );
}

export default Form;
