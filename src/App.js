import React, {Component} from 'react';
import NumBaseball from './NumberBaseBall'; 

class App extends Component {
  render() {
    return (
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
        </div>
    )
  }
}
export default App;
