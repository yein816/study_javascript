import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete,MdBorderColor,MdCheck, MdCancel, MdInput } from 'react-icons/md';
import { useTodoDispatch } from './TodoContext';
import TodoUpdate from './TodoUpdate';
//import {TodoCreate()} from './TodoCreate';


const Remove = styled.div  //삭제 아이콘 
` 
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const Update = styled.div   // 수정 아이콘
`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #000;
  }
  //display: none;

`;

const Success = styled.div  //확인 아이콘 style
`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #000;
    }
    display: none;
`;

const Cancel = styled.div // 취소 아이콘 style
`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div  // 체크 + text + 아이콘 담은 영역
` 
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-line: 1px solid #000;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${Update} {
      display: initial;
    }
    ${Success} {
      display: initial;
    }
    ${Cancel} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div  //체크 영역
` 
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ff3558;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #ff3558;
      color: #ff3558;
    `}
`;


const Text = styled.div   // input 창에 적은 텍스트
`
  font-size: 21px;
  color: #495057;
  ${props =>   
    props.done &&
    css`
      color: #d1d1d1;
    `}
   
`;

const InputFocus = styled.input // inputRef style
`
    border-style: none;
    //width:320px;
    height: 25px;
    line-height: 25px;
    float:left;
    font-size: 21px;
    color:#495057;
    margin-top: 2px;

    &:hover {
      cursor: pointer;
    }
    
    ${props =>   
      props.toggle &&
      css`
        display: block;
    `}
`;


function TodoItem({ id, done, text }) {  // id로 추가,수정,삭제 done : true,false 나누고, text는 input 값 
  const dispatch = useTodoDispatch();  //toggle, create, remove, update 기능을 위해 

  
  const inputRef = useRef('');  //inputRef 새로 생성 , createRef()로 초기화
  
  
  const handleClick = (e) => {   // 클릭했을 때 생성한 input 포커스되고 입력한 값 나오게
    e.preventDefault();
      inputRef.current.focus();
      inputRef.current.value = text
  }

  const [value, setValue] = useState('');     //value 라고 부르는 새로운 state 변수를 선언하고, '' 으로 초기화
  const [toggle,setToggle] = useState(false);  //toggle로 수정버튼 눌렀을 때 text,input 이동되게

  
    const handleChange = (e) => {  //input에 수정한 값을 value에 넣기위해
       
      //setValue(e.target.value)
       setValue({
      //     //[inputRef.current.value] : value
           [value]:inputRef.current.value
       })

       console.log(value)
    }

    const handleToggleChange = (props) => {  // toggle
        
        //const { data, onUpdate } = this.props;
        const data = props.data;
        const onUpdate = props.onUpdate;

        //false -> true
        if(!toggle) {   
            setToggle({
                text : data.value,
                toggle: true,
            })
        }else {
            onUpdate(data.id, { text: value });
            setToggle({
                toggle: false,
            })
        }
        //true -> false
    }


  // 체크 동작
  const onToggle = () => {    
    dispatch({  // store의 내장함수 중 하나, 액션을 발생시키는 함수이다 , 액션을 파라미터로 전달한다 -> dispatch(action)
      type: 'TOGGLE',  // 액션 객체는 type 필드를 필수적으로 가지고 있어야 하고 , 그 외의 값들은 마음대로 넣어줄수 있다.  
      id
    });
  };

  // 삭제
  const onRemove = () => {   
    dispatch({
      type: 'REMOVE',
      id
    });
  };

 const onUpdate = () => {
   dispatch({
     type: 'UPDATE',
     id
   })
 }

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}> 
        {done && <MdDone /> }
      </CheckCircle>

      <Text done={done} onclick={handleChange}>{text}</Text>

      <Update> 
        <InputFocus
          type="text"
          ref={inputRef}
          //value={text}
          onChange={handleChange}
          onClick={handleClick}></InputFocus>
          <MdBorderColor onClick={handleClick} onChange={handleToggleChange}></MdBorderColor>
      </Update> 

      {/* <TodoUpdate/> */}

      <Success><MdCheck onClick={onUpdate}/> 
      </Success>

      <Remove onClick={onRemove}>
        <MdDelete/>
      </Remove>
      
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);

//React.memo(Hook 함수) 사용하는 이유 : 다른 항목이 업데이트 될 때 , 불필요한 리렌더링을 방지하게 되어 성능을 최적화 할수 있음
