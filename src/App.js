import React, {Component, useCallback} from 'react';
//import NumBaseball from './baseball/NumberBaseBall';  //숫자야구 NumberBaseBall.jsx

import TodoTemplate from './todoComponents/TodoTemplate';  // TodoTemplate, TodoHead , TodoList -> todolist 스타일
import TodoCreate from './todoComponents/TodoCreate';  // input, 입력버튼
import TodoHead from './todoComponents/TodoHead'; // 날짜, 할일 갯수 
import TodoList from './todoComponents/TodoList'; // 각 리스트에 보여지는 것을 넣기
import { TodoProvider } from './todoComponents/TodoContext';

//todolist 
const App = () => {

  return (
    <TodoProvider>
    <TodoTemplate>
      <TodoHead />
      <TodoList />
      <TodoCreate />
    </TodoTemplate>
  </TodoProvider>
  );
}
export default App;


//NumberBaseBall.jsx에 쓰임
// class App extends Component { //state를 위해서 사용함..
//   render() {
//     return (
       /*
            <div class="wrap">  
              <div> 
               <h1>숫자야구</h1>
               <div class="random">
                   <div class="question">
                       <p class="question_text"></p>
                    </div>
                    <NumBaseball/>  
                  </div>  
               </div>
            </div> */
//     )
//   }
// }
// export default App;

//prop = property (태그의 속성을 설정해주는 것) , ex) <Myname name="react"/>  
//react는 내가 전달한 props를 가져가는 일을 한다.
