import React, { useState, useEffect } from "react";
import Navabar from "../../components/Layout/Navabar";
import TodoServices from "../../Services/TodoServices";

const TodoList = () => {
  const [todoStatus, settodoStatus] = useState("");
  const [filteredTask, setfilterTask] = useState([]);
  const [allTask, setAllTask] = useState([]);

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData?.user.id;

  const getUserTask = async () => {
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const incomplete = allTask?.filter((item) => item?.isCompleted === false);
    const completed = allTask?.filter((item) => item?.isCompleted === true);
    if (todoStatus === "incomplete") {
      setfilterTask(incomplete);
    } else if (todoStatus === "completed") {
      setfilterTask(completed);
    }

    getUserTask();
  }, [todoStatus]);

  return (
    <>
      <Navabar />
      <div className="filter-container">
        <h4>filter Todos by</h4>
        <div className="filter-group">
          <select
            className="form-select"
            onChange={(e) => settodoStatus(e.target.value)}
          >
            <option value="Select" selected>
              select status
            </option>
            <option value="incomplete">incomplete</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>
      {/*========================*/}
      <div className="card-container">
        {filteredTask?.length === 0 ? (
          <h1 className="no-task">No Task Found </h1>
        ) : (
          filteredTask?.map((task, i) => (
            <>
              <div
                className="card  mb-3 border-primary mt-3"
                style={{ maxWidth: "18rem" }}
                key={i}
              >
                <div className="card-header">
                  <div className="chead">
                    <h6>{task?.title.substring(0, 10)}</h6>
                    <h6
                      className={
                        task?.isCompleted === true ? "tsk-com" : "tsk-inc"
                      }
                    >
                      {task?.isCompleted === true ? "completed" : "incomplted"}
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
                  <p className="card-text" style={{ fontSize: "15px" }}>
                    {task?.description}
                  </p>
                  <h6>Date :{task?.createdAt.substring(0, 10)}</h6>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;
