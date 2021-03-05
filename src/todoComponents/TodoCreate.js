import React, { useReducer, useState } from 'react';   // useState 라는 함수를 불러와 준다.
import styled, { css } from 'styled-components';
import { useTodoDispatch, useTodoNextId } from './TodoContext';


const InsertForm = styled.form   //input,입력버튼이 담아주는 form  style
`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 30px;
  padding-right: 32px;
  padding-bottom: 30px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input  //input style
`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 80%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

const Submit = styled.button  //button style
`
  width:15%;
  background-color:#000;
  height:46px;
  line-height:46px;
  border-style:none;
  color:#fff;
  margin-left : 20px;
  font-size: 18px;
  border-radius:5px;
`;

function TodoCreate() {

  // 리엑트 hooks 중 하나, 컴포넌트에서 보여줘야하는 내용이 사용자에 따라 바뀌어야 할 때 "useState"를 통해 컴포넌트에서 바뀌는 값 관리한다
  // 컴포넌트에서 동적인 값을 state(변하는 값), 리엑트에서는 useState 라는 함수가 있어서 이 함수를 사용하면 컴포넌트에서 상태를 관리할수 있다.
  // useState를 사용 할 때는 상태의 기본값을 파라미터로 넣어서 호출 , 호출하면 배열이 반환이 되고, 배열안에 첫번째는 현재상태, 두번째는 Setter 함수(현재상태를 변경하는 방법)이다.
  // setValue에 파라미터로 함수를 넘겨주면, 이전 값을 넣어준다.
  const [todo_value, setTodo_Value] = useState('');  
 
  const dispatch = useTodoDispatch();  // 액션 
  const nextId = useTodoNextId(); // id

  
  //ex) const value = valueState[0]; const setValue = valueState[1]; 
  // 위와 같이 선언을 더 해야하지만, 아래와 같이 배열 비구조화 할당을 통해서 각 원소를 추출해준것
  // onChange에서 setValue를 사용할 때 다음상태를 파라미터로 넣어준게 아니고, 값을 update 하는 함수를 파리미터에 넣어준것
  const onChange = e => setTodo_Value(e.target.value);  // input의 값이 바뀔 때마다 그 값을 state의 value에 할당
  const onSubmit = e => {
    e.preventDefault();  //새로고침 방지

    dispatch({
      type: 'CREATE', 
      todo: {  // todo 배열안에 id, text, done 담기
        id: nextId.current,  //id가 새로 생성
        text: todo_value,  // input 값
        done: false,  // todo를 했나 안했나 표시, 추가를 하는것이기에 false, 이미 했으면 true]
        //toggle: false,  //수정
      }
    });
    nextId.current += 1;  // 추가할 때마다 id 증가 , id로 crud를 해야하기에 
    setTodo_Value(''); // 추가한 input에 작성한 값을 없앤다.
  };

  return (
    <>
      <InsertForm onSubmit={onSubmit}>
        <Input
          autoFocus
          onChange={onChange}
          value={todo_value}
          placeholder="할 일을 입력하세요"
        />
        <Submit>입력</Submit>
      </InsertForm>
    </>
  );
}

export default TodoCreate;
