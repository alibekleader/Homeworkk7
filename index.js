// Reduxni import qilish
const { createStore } = require('redux');

// Boshlang'ich holatni aniqlash
const initialState = {
  tasks: []
};

// Harakat turlarini aniqlash
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const READ_TASK = 'READ_TASK';


const addTask = (task) => ({
  type: ADD_TASK,
  payload: { id: Date.now(), task }
});

const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id
});

const updateTask = (id, task) => ({
  type: UPDATE_TASK,
  payload: { id, task }
});

const readTask = () => ({
  type: READ_TASK
});


const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, task: action.payload.task } : task
        )
      };
    case READ_TASK:
      return state;
    default:
      return state;
  }
};

const store = createStore(taskReducer);


const createTask = (task) => {
  store.dispatch(addTask(task));
};

const removeTask = (id) => {
  store.dispatch(deleteTask(id));
};

const editTask = (id, task) => {
  store.dispatch(updateTask(id, task));
};

const getTasks = () => {
  console.log(store.getState().tasks);
};


createTask(`Reduxni o'rganish`);
createTask('todo app build');
getTasks();

editTask(store.getState().tasks[0].id, `Reduxni chuqurroq o'rganish`);
getTasks();

removeTask(store.getState().tasks[1].id);
getTasks();
