import React from "react";

function App() {
  const [todo, setTodo] = React.useState([]);
  const [val, setVal] = React.useState("");
  return (
    <div class="container mt-5">
      <h1 class="text-center mb-4">To Do List</h1>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="todo-input"
                  placeholder="Add new task"
                  required
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
                <button
                  class="btn btn-primary"
                  onClick={() => {
                    setTodo((prv) => [...prv, val]);
                    setVal("");
                  }}
                >
                  Add
                </button>
              </div>

              <ul class="list-group">
                {todo.map((task) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center ">
                    <span class="task-text">{task}</span>
                    <div class="btn-group">
                      <button
                        onClick={() => {
                          setTodo((priv) => priv.filter((v) => v !== task));
                        }}
                        class="btn btn-danger btn-sm delete-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
