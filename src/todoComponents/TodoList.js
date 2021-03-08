import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';

const TodoListBlock = styled.div  //리스트 영역
` 
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;

`;


function TodoList() {
  
  const todos = useTodoState();  // useState와 같이 변하는 상태를 관리 , 작성한 todolist를 todos에 담기

  // map 기본 문법
  // arr.map (callback, [thisArg])
  // callback - 새로운 배열의 요소를 생성하는 함수, 총 3가지 인수를 가짐 -> currentValue (현재 처리되고 있는 요소), index (현재 처리되고 있는 요소의 index 값) , array(메소드가 불려진 배열)
  // thisArg (선택항목) callback 함수 내부에서 사용 할 this 값을 설정
  // 배열 내의 각 요소를 프로세싱하여 결과 나온것을 새로운 배열을 생성함.
  // 배열을 생성할 때 아래와 같이 id, text, done, key 가 들어가게 함
  return (
    <TodoListBlock>
      {todos.map(todo => (  
        <TodoItem
          id={todo.id}
          text={todo.text}
          done={todo.done}
          key={todo.id}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
