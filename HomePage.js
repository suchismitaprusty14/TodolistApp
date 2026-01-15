import React, { useEffect, useState } from "react";
import Navabar from "../../components/Layout/Navabar";
import PopModel from "../../components/PopModel";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Cards/Card";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setsearchQuery] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState("");

  //handlemodal

  const openModalHandler = () => {
    setShowModal(true);
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    console.log("filetr list", filterList);
    setsearchQuery(query);
    if (query && filterList.length > 0) {
      setAllTask(filterList && filterList);
    } else {
      getUserTask();
    }
  };
  // get user Todo
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
    getUserTask();
  }, []);

  return (
    <>
      <Navabar />
      <div className="container">
        <div className="add-task">
          <h1>Your task</h1>
          <input
            type="search"
            placeholder="search your task"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn " onClick={openModalHandler}>
            Create Task
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <h4>
          {allTask && <Card allTask={allTask} getUserTask={getUserTask} />}
        </h4>
        {/*==================modal==============*/}
        <PopModel
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default HomePage;
