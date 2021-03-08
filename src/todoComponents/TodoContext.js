import React, { createContext, useReducer, useContext, useRef } from 'react';

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


function todoReducer(state, action) {  //현재상태와 액션 객체를 받아온다!
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);  //push 와 같은 개념으로 추가할 때 concat 함수를 사용한다. push 보단 concat을 추천

    case 'TOGGLE':
      // 이벤트가 발생한 id의 객체일 경우에만 todo의 done 상태를 변경 (false or true)
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo    
      );
    case 'UPDATE':
      return state.map(todo => 
        todo.id === action.id ? {...todo, text:action.text} : todo
      );

      case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
   
  }
}

const TodoList = [
//   {
//     id: 1,
//     text: '',
//     done: true
//   },
//   {
//     id: 2,
//     text: '',
//     done: true
//   }
];

export function TodoProvider({ children }) {  //컴포넌트에서 리덕스를 사용하도록 서비스를 제공해준다.  
  const [state, dispatch] = useReducer(todoReducer, TodoList);
  const nextId = useRef(0);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}


// useReducer 쓰는 이유
// 이전에 만들었던 주요 상태 업데이트 로직은 App 컴포넌트 내부에서 이루어 졌다. 
// 상태를 업데이트 할 때는 useState를 사용해서 새로운 상태를 설정해줬는데, 상태를 관리하게 될때 이것 말고 다른 방법도 있다.
// useReducer(Hook 함수)를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리 시킬 수 있다.
// 상태 업데이트 로직을 컴포넌트 바깥에 작성할수도 있고, 다른파일에 작성후 불러올수도 있다

// useReducer 란
// 현재상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
// reducer에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태이다
// action - 업데이트를 위한 정보를 가지고 있다. 주로 type 값을 지닌 객체 형태로 사용하지만, 꼭 따라야 할 규칙은 없다. (형태 자유)