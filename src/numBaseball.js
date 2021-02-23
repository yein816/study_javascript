import React, {Component} from 'react';

class NumBaseball extends Component {
  render() {
    return (
      <div class="wrap">
        <div>
          <h1>숫자야구</h1>
          <div class="random">
            <div class="question">
              <p class="question_text">3개의 숫자를 입력하세요</p>
            </div>
            <div>
              <p class="chance" style="float: left;"></p>  
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NumBaseball;
