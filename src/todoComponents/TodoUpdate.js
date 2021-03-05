 import React, { useState , useRef} from 'react'; 
 import styled, { css } from 'styled-components';
 import {MdBorderColor,MdCheck, MdCancel } from 'react-icons/md';
 import TodoItem from './TodoItem';

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

function TodoUpdate({ done, text}) {

  const inputRef = useRef('');  //inputRef 새로 생성 , createRef()로 초기화
  
  const handleClick = (e) => {   // 클릭했을 때 생성한 input 포커스되고 입력한 값 나오게
    e.preventDefault();
      inputRef.current.focus();
      inputRef.current.value = text
    }
    console.log(inputRef.current.value)

  
    const [value, setValue] = useState('');     //value 라고 부르는 새로운 state 변수를 선언하고, '' 으로 초기화
    const [toggle,setToggle] = useState(false);  //toggle로 수정버튼 눌렀을 때 text,input 이동되게

  
    const handleChange = (e) => {  //input에 수정한 값을 value에 넣기위해
       
      setValue({
          // [inputRef.current.value] : text
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
        setToggle({
         
        })
    }

    return(
        <>
        {toggle ? (
          <Update> 
            <InputFocus
              type="text"
              ref={inputRef}
              onChange={handleChange}
              onClick={handleClick}
              />
          </Update> 
        ) : (
          <Text done={done}>{inputRef.current.value}</Text>
        )} 
        
        {/* <button onChange={handleToggleChange }>
          {toggle ? "적용" : "수정"}</button> */}
      </>
    ) 

}    

export default React.memo(TodoUpdate);


//  React는 해당 변수를 리렌더링 할 때 기억, 가장 최근에 갱신된 값을 제공한다

//  state - 컴포넌트 내부에서 바뀔 수 있는 값을 의미 
//  props - 부모 컴포넌트가 설정해서 자식 컴포넌트는 읽기만 할 수 있는 값 , 바꿀려면 부모 컴포넌트에서 직접 변경해야함

//  Hook  - React state를 함수 안에서 사용할수있게 해준다. 클래스 안에서 동작하지 않는다. 하지만 클래스를 작성하지 않고 사용할수있다.
//  Hook을 언제사용하나? - 함수 컴포넌트를 사용하다가 state를 추가하고 싶을 때  
//  Hook은 항상 use라는 키워드로 시작한다

//  함수 컴포넌트  (아래와 같은 구조로 생겼다.) 
//  const Example = (props) => {     ,   function Example(props) {
//     여기서 Hook 사용할수있다
// return <div/>;
//  }

//  함수컴포넌트는 this를 가질 수 없기 때문에 this.state를 할당하거나 읽을 수 없다. 대신! useState Hook을 직접 컴포넌트에 호출한다.
//  useState는 state를 함수 컴포넌트 안에서 사용할 수 있게 해준다.

//  useState를 호출하는것은 무엇을 하는건가 - state 변수를 선언할 수 있다. 아래처럼 value라고 작성하였지만 아무거나 지어도 상관없으며,
//  useState = this.state  (제공하는 기능이 같다) 

//  useState의 인자로 무엇을 넘겨주어야 하나 - state의 초기값
//  함수 컴포넌트의 state는 클래스와 달리 객체일 필요 없고 숫자,문자타입을 가질수 있다.
 
//  useState는 무엇을 반환하나 - state변수, 해당변수를 갱신할 수 있는 함수 두가지를 반환한다 그래서 아래와 같이 쓰는 이유이다.

// ref를 사용해야 할 때 : 1. 포커스, 텍스트 선택영역 등등 관리할 때 
// class UpdateComponent extends React.Component {
//     constructor(props) {    
//     super(props);
//     //inputRef DOM 앨리먼트를 저장하기 위한 ref를 생성함.
//     // React.createRef() 이용하여 ref를 만든다.
//     this.inputRef = React.createRef(); 
//     this.focusTextInput = this.focusTextInput.bind(this);
   
//     }

// function TodoUpdate() {
//     const [value, setValue] = useState('');  // value: 현재값, setValue: 변경할 값, useState({초기값})
    
//     const inputRef = React.createRef();  //inputRef 새로 생성

    
//     function handleClick() {
//         inputRef.current.focus();   // inputRef에 포커스
        
//     }
  


  



