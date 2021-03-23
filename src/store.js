import {createStore} from 'redux';
import {configureStore, createAction, createReducer, createSlice} from '@reduxjs/toolkit';


// createAction은 type과 payload를 갖은 객체를 리턴
// 기존 Type을 변수로 선언해두고 ActionCreator 함수를 만들었지만 해당 문장 하나로 수정 가능
const addTodo = createAction('ADD');
const deleteTodo = createAction('DELETE')

/* const reducer = (state = JSON.parse(localStorage.getItem('redux-todo-list')) ?? [] , action) => {
    switch(action.type) {
        case addTodo.type:  // 해당 액션의 type값을 가져올 수 있음.
            const addedToDoList = [{text: action.payload, id: Date.now()}, ...state];
            saveInLocalStorage(addedToDoList);
            return addedToDoList;
        case deleteTodo.type:
            const deletedToDoList = state.filter(todo => todo.id !== action.payload);
            saveInLocalStorage(deletedToDoList);
            return deletedToDoList;
        default:
            return state
    }
} */


// createReducer는 reducer를 쉽게 만들어줌
// 첫번째 인자는 초기값, 두번째 인자는 액션 맵
// createReducer는 state를 변환하여도 알아서 복제하여 반환하기 때문에 변환이 가능하다.
// state를 직접 변경하는 경우에는 return을 안하고, 새로운 state를 반환할 때만 return을 작성한다.
const reducer = createReducer([], {
    [addTodo]: (state, action) => {
        state.push({text: action.payload, id: Date.now()});
    },
    [deleteTodo]: (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
    }
})

// createSlice(options)
// options : {
//             reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>, 
//            initialState: any,
//             name: string,
//            extraReducers?:| Object<string, ReducerFunction>}| ((builder: ActionReducerMapBuilder<State>) => void)
// }
// createSlice는 Action과 Reudcer를 동시에 선언할수 있게 해줌

const toDos = createSlice({
    name: "ToDoReducer",
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({text: action.payload, id: Date.now()});
        },
        remove: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    }
})

// configureStore 기본 설정된 store를 만들어주는 함수
const store = configureStore({reducer:toDos.reducer});

export const {add, remove} = toDos.actions;
export default store;