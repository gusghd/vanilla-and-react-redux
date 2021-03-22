import {createStore} from 'redux';

const ACTION_MAP = {
  ADD: 'ADD_COUNT',
  MINUS: 'MINUS_COUNT'
}

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const countSpan = document.querySelector("span");

// reducer 선언
// reducer의 첫번째 파라미터는 이전 state
// 두번째 파라미터는 dispatch의 파라미터
const reducer = (state, action) => {

  if (state === undefined) {
    state = {
      count: 0
    }
    
  }
  const newState = Object.assign({}, state);

  switch(action.type) {
    case ACTION_MAP.ADD:
      newState.count = state.count + 1;
      break;
    case ACTION_MAP.MINUS:
      newState.count = state.count - 1;
      break;
    default:
      
  }

  return newState;
}

const store = createStore(reducer);


const updateCountRender = () => {
  const {count} = store.getState();
  countSpan.innerText = count;
}

store.subscribe(updateCountRender)


const addHandler = () => {
  store.dispatch({type: ACTION_MAP.ADD})
}

const minusHandler = () => {
  store.dispatch({type: ACTION_MAP.MINUS})
}

add.addEventListener('click', addHandler);
minus.addEventListener('click', minusHandler);