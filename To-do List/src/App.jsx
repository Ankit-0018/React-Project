import { useEffect, useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTodos([...todos, inputValue]);
    setInputValue(""); // Clear input after adding task
  };

  const handleRemove = (todo) => {
    setTodos(todos.filter((to) => to !== todo));
  };

  useEffect(() => {
    if(todos.length>0) localStorage.setItem("todos" , JSON.stringify(todos))
    


  },[todos]);
  
  useEffect(() => {

    const savedData = JSON.parse(localStorage.getItem("todos"));
    console.log(savedData)
    if(savedData) {
  setTodos(savedData)};

    

  },[])

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <header className="text-center text-xl font-bold mb-4 text-red-300">
          My Todo List
        </header>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add your Task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </form>

      <ul className="mt-6 w-full max-w-md">
        {todos.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 p-3 my-2 rounded-lg shadow-md"
          >
            {task}
            <button
              onClick={() => handleRemove(task)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}