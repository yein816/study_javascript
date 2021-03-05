import React from 'react';
import styled from 'styled-components';
import { useTodoState } from './TodoContext';

const TodoHeadBlock = styled.div  //영역과 날짜 들어가는 부분 style , 상단 div
`   
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
    }

  .day {
    margin-top: -35px;
    color: #939393;
    font-size: 21px;
    font-weight: bold;
    float:right;
  }
  
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const TodoLeft = styled.div  //할일 style
`
  color: #2035c9;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

function TodoHead() {
  const today = new Date();  //현재 날짜 ,Date 객체는 new라는 연산자를 사용하며, Date가 유일하다

  const dateString = today.toLocaleString('ko-KR', {   //연도,월,일 변수에 담고
    //toLocaleString() 메서드는 배열의 요소를 내타내는 문자열을 반환함
    //ex) arr.toLocaleString(locales,{options});
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }); // year,day=numeric(숫자) , month,weekday=long  "기본값"

  const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });  //평일
  const todos = useTodoState(); // useState와 같이 변하는 상태를 관리 , 작성한 todolist를 todos에 담기
  const NotWork = todos.filter(todo => !todo.done);  // 작성한 todolist 중 필터 함수를 통해서 했는지 안했는지를 구별하여 안했으면 NotWork에 담기 
  
 //{NotWork.length} 안한 일에 갯수를 보여준다.
  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>  
      <div className="day">{dayName}</div>
      <TodoLeft>할 일  No.{NotWork.length}</TodoLeft> 
    </TodoHeadBlock>
  );
}

export default TodoHead;
