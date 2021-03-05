import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div  // 다른 컴포넌트 담는 div 
`
  width: 512px;
  height: 768px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

//children 을 쓰는 이유 : 컴포넌트에서 다른 컴포넌트를 담기 위해서 props(property)의 children
export default TodoTemplate;
