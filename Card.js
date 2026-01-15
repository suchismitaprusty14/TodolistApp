import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask, getUserTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Edit handler
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task deleted successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <div
            className="card mb-3 border-primary mt-3"
            style={{ maxWidth: "18rem" }}
            key={task._id}
          >
            <div className="card-header">
              <div className="chead">
                <h6>{task?.title.substring(0, 10)}</h6>
                <h6 className={task?.isCompleted ? "tsk-com" : "tsk-inc"}>
                  {task?.isCompleted ? "Completed" : "Incomplete"}
                </h6>
              </div>
            </div>

            <div className="card-body">
              <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
              <p className="card-text" style={{ fontSize: "15px" }}>
                {task?.description}
              </p>
              <h6>Date: {task?.createdAt?.substring(0, 10)}</h6>
            </div>

            <div className="card-footer bg-transparent border-primary">
              <button
                className="btn btn-warning"
                title="Edit Task"
                onClick={() => handleEdit(task)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-danger ms-2"
                title="Delete Task"
                onClick={() => handleDelete(task?._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedTask && (
        <EditTodo
          task={selectedTask}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;
