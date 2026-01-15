import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";

const PopModel = ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
  getUserTask,
}) => {
  //handler of close
  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));

      const createdBy = userData && userData.user.id;
      const data = { title, description, createdBy };

      if (!title || !description) {
        return toast.error("please provide titile or description");
      }

      console.log("data", data);
      const token = userData?.token;

      console.log("Token being used:", token);

      await TodoServices.createTodo(data);
      setShowModal(false);
      getUserTask();

      toast.success("task created successfully");

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("error in save task from frontend", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMsg);
    }
  };
  return (
    <>
      {showModal && (
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
                <h5 className="modal-title">Add New Task</h5>
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea"
                    placeholder="add your description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Description</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  close
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn "
                  style={{ background: "#e74c3c" }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopModel;
