// ********************** GET REQUEST**********************
function getTodos() {
  //   axios({
  //     method: "get",
  //     url: "https://jsonplaceholder.typicode.com/todos",
  //     params: {
  //       _limit: 5,
  //     },
  //   })
  //     .then((res) => showOutput(res))
  //     .catch((err) => console.log(err));

  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5", { timeout: 5 })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ********************** POST REQUEST**********************
function addTodos() {
  //   console.log("POST REQUEST");
  //   axios({
  //     method: "post",
  //     url: "https://jsonplaceholder.typicode.com/todos",
  //     data: {
  //       title: "new todo",
  //       completed: false,
  //     },
  //   })
  //     .then((res) => showOutput(res))
  //     .catch((err) => console.log(err));

  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "new todos",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ********************** PUT/PATCH REQUEST**********************
function updateTodos() {
  //   console.log("PUT/PATCH REQUEST");
  //   axios
  //     .put("https://jsonplaceholder.typicode.com/todos/1", {
  //       title: "updated put todos",
  //       completed: true,
  //     })
  //     .then((res) => showOutput(res))
  //     .catch((err) => console.log(err));

  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "updated patch todos",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ********************** DELETE REQUEST**********************
function removeTodos() {
  //   console.log("DELETE REQUEST");
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// *************************SIMULTANEOUS REQUEST*************************
function getData() {
  //   console.log("SIMULTANEOUS REQUEST");
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.log(err));
}

// *************************CUSTOM HEADERS*************************
function customHeaders() {
  //   console.log("CUSTOM HEADERS"); look in config
  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: "sometoken",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "new todos",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// *************************TRANSFORM REQUEST & RESPONSES*************************
function transformResponse() {
  //   console.log("Transform response");
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello world",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// *************************ERROR Handling*************************
function errorHandling() {
  //   console.log("Error handling");

  axios
    .get("https://jsonplaceholder.typicode.com/todosf", {
      validateStatus: function (status) {
        return status < 500;
      },
    })
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.message) {
        // server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    });
}
//*************************Cancel tokens*************************
function cancelToken() {
  //   console.log("Cancel token");
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request cancelled", thrown.message);
      }
    });
  if (true) {
    source.cancel("Request canceled");
  }
}
// ****************** INTERCEPTORS REQUEST AND RESPONSE *****************
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  AXIOS INSTANCE
const axiosInstance = axios.create({
  // other custom settings
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosInstance.get("/comments").then((res) => showOutput(res));

// *************************show output in browser*************************
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class='card card-body mb-4'>
         <h5>Status : ${res.status} </h5>
    </div>

    <div class= 'card mt-3'>
        <div class='card-header'>Headers</div>
         <div class='card-body'>
            <pre> ${JSON.stringify(res.headers, null, 2)} </pre>
         </div>
    </div>

    <div class='card mt-3'>
        <div class = "card-header">
          Data
        </div>
        <div class = "card-body">
            <pre>${JSON.stringify(res.data, null, 2)}  </pre>
        </div>
    </div>
    <div class = "card mt-3">
      <div class = "card-header">
        Config
      </div>
      <div class = "card-body">
        <pre>${JSON.stringify(res.config, null, 2)} </pre>
      </div>
    </div>"
    `;
}

// EVENT LISTENERS
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodos);
document.getElementById("update").addEventListener("click", updateTodos);
document.getElementById("delete").addEventListener("click", removeTodos);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
