import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const EditTodo = ({ task, setShowModal, getUserTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setIsCompleted(task.isCompleted || false);
    }
  }, [task]);

  const handleClose = () => {
    setShowModal(false);
  };

  const id = task?._id;

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy, isCompleted };

      if (!title || !description) {
        return toast.error("Please provide title and description");
      }

      await TodoServices.updateTodo(id, data);
      setShowModal(false);
      toast.success("Task updated successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const handleSelectChange = (e) => {
    setIsCompleted(e.target.value === "true");
  };

  return (
    <>
      {task && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update your Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>Description</div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea"
                    placeholder="add your description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="my-3" style={{ width: "150px" }}>
                  <select
                    className="form-select"
                    value={isCompleted}
                    onChange={handleSelectChange}
                  >
                    <option value={true}>Completed</option>
                    <option value={false}>Incomplete</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn"
                  style={{ background: "#e74c3c", color: "#fff" }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
