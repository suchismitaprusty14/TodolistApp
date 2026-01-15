import axios from "axios";

//get user token
// const user = JSON.parse(localStorage.getItem("todoapp"));

// //default auth header
// axios.defaults.headers.common["Authorization"] = `bearer${user.token}`;
const user = JSON.parse(localStorage.getItem("todoapp"));

if (user && user.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
} else {
  console.warn("No token found in localStorage");
}

const createTodo = (data) => {
  console.log("data in todoser", data);

  // get token from localStorage
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const token = userData?.token;

  return axios.post("/todo/create", data, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ attach token
    },
  });
};
const getAllTodo = (id) => {
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const token = userData?.token;

  return axios.post(`/todo/getAll/${id}`, id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const updateTodo = (id, data) => {
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const token = userData?.token;

  return axios.patch("/todo/update/" + id, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const deleteTodo = (id) => {
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const token = userData?.token;

  return axios.delete("/todo/delete/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
