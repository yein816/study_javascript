import React, {Component} from 'react';
import Try from './TryNum';


const numberList = [];

function randomNum() {
    const number = [0,1,2,3,4,5,6,7,8,9]; 
    numberList.splice(0,3); //담았던 랜덤숫자를 삭제 
    
    for(let i=0; i<3; i++) {
        const randomNum = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        numberList.push(randomNum);
        console.log(numberList)
    }
    return numberList;
}

class NumBaseball extends Component {
    state = {  //변화될 수 있는 상태
        result: '',  //결과문구
        value: '',  // 내가 입력한 값
        answer:randomNum(), //ex:[1,3,5] 랜덤 숫자
        tries:[], // 적은 값과 결과 값을 담아주는 배열 , "push 하면 안된다" 리엑트는 같은 배열 안에 새로운 값을 푸시하면 값이 뭐가 바꼈는지 감지 못함 
        trynum : 5, //총 기회
        //ex) const array = [];
        // array.push(1); -> 기존 배열에 값 추가하는 방식
        // React 방식 -> const array2 = [...array,2] 기존 배열 복사하고 새로운값 넣어주기  , array2치면 [1,2] 값이 나옴 
        // array2 값을 감지할수 있는 이유는 array===array2 는 false 이기 때문에 
        // *react는 기존 배열에 푸시하면 랜더링을 안한다. 달라진게 없다고 판단하기에 ex) arr===arr 'true', 꼭 새로운 배열을 만들어서 
        // arr===arr2 'false' 이렇게 나올수있게 세팅을 해서 랜더링을 할수 있게 해줘야 한다. 
    };
    
    onSubmitForm = (e) => {  //입력 버튼 이벤트 발동시키겠다        
        e.preventDefault();  //a태그나 submit태그를 사용할 시 꼭 같이 써주는게 좋음. 둘다 href로 이동하기에 창이 리로딩해주는것을 막아준다.

        const { result, value, answer, tries ,trynum } = this.state; //반복으로 쓰이는 것은 변수로 담아주기
        
        if(value ===""){ // 입력한 값이 없을 때
            alert('숫자입력하세요')

            return false; //return을 false로 해줘야 실행을 막아준다.
        }

        if(value === answer.join('')) { // 랜덤 숫자와 입력한 값이 똑같다면, 문자열과 배열과 비교하려면 join을 꼭 써줘야한다. 같은 형태로 맞춰주기 위해 
            this.setState((prevState) => {  //과거 state(상태)를 현재 state(상태)로 
                return {
                    result: '축하합니다!!',
                    tries: [...prevState.tries, {putnum: value, result:'축하합니다!!'}],
                    
                }
            })
            this.setState( {  // 정답을 맞혔으니 다 초기화 시킴
                
                value: '',
                answer:randomNum(),
                tries:[],  
                trynum : 0 ,
            })
        }else{ //맞지 않다면
            //split: 작성한 값을 한글자씩 떨어지게 함. 
            // 문자배열을 숫자배열로 바꾸는 
            //map() - 배열을 일대일로 짝짓는 함수 
            const answerList = value.split('').map((v) => parseInt(v));
            let strike = 0; 
            let ball = 0; 
            
            if(tries.length >=4) { // 5번이상 틀렸으면 
               
                this.setState({
                    result: `실패하였습니다! 정답은${answer.join(',')}`,
                    
                });
                this.setState( {
                    value: '',
                    answer:randomNum(),
                    tries:[],
                    trynum : 5 ,
                });
            }else {  // 랜덤숫자 3개가 입력한 숫자와 스트라이크인지 볼인지 판단
                for(let i=0; i<3; i++) {
                    if(answerList[i] === answer[i]) { //한번씩 돌때마다 입력한 "숫자"가 랜덤으로 나온 "숫자"와 같다면   
                        strike +=1;  //숫자와 자리가 같으면
                    } else if(answer.includes(answerList[i])){ // 랜덤숫자를 담은 answer의 include을 통해 판별해준다. answerList와 같은 숫자가 있는지  
                        ball +=1; //숫자만 같다면
                    }
                }
                this.setState((prevState) => { //이전값(prevState)을 현재값(setState)과 비교하기 위해서 써줘야 함. 비동기 방식 
                    return {
                        tries:[...prevState.tries, {putnum: value, result: `${strike}Strike,${ball}Ball`}],
                        value:'',  
                    }
                    
                });
            }
        }
        console.log(tries)
    }
    
    onChangeInput =(e) => {
        //console.log(this.state.answer);
        this.setState({  //setState 현재상태 
            value: e.target.value,  // 내가 input 창에 작성한(계속 변화하는 값)을 value에 넣어준다
        });
        console.log(e.target.value)  // target을 작성해 주지 않으면 내가 작성한 (변화한 값)을 받아오지 않고 undefined이 뜬다
    };


    //리엑트 반복문(map) - 리엑트 에서는 반복문을 map()함수을 사용한다, 달라지는 부분을 배열로 만들어 받아오고 공통되는 부분은 return 
    render() {
        const { result, value, tries,trynum } = this.state;
        
        return (
            <>
                <h1>{result}</h1>   {/*{}를 써줘야 자바스크립트 쓸수 있다.*/}
                <form onSubmit={this.onSubmitForm}>
                <input maxLength={3} value={value} onChange={this.onChangeInput} />   {/*싱글태그는 꼭 뒤에 "/"를 써줘야 오류가 안난다 html이 아니라 XML 이기에*/}
                </form>
                <div>기회 :{trynum-tries.length}</div>
                <ul> {/*숫자 작성한 값과 strike,ball 유무 알려주는 */}
                    {tries.map((v,i) => {  //map 함수를 통한 반복 랜더링 
                        return (
                            <Try key={`${i+1}`} tryInfo={v} />
                            // key - 달라지는 부분을 객체로 만든다 , 고유한 값이 들어가야 함 
                            // 리엑트가 key를 보고 같은 component인지 아닌지 판단
                        );
                    })}
                </ul>
            </>
        )
    }
}
//for() - 초기값부터 증가 or 감소 하면서 조건에 부합하면 계속 반복 , 중간 break문을 만나면 반복문 중단
//forEach () - 배열의 각 요소에 대해 callback을 실행, 배열을 순회하여서 break문을 사용할수 없다
//map () - 배열의 각 요소에 대해서 callback을 실행하고 실행결과를 모은 "새 배열"을 리턴함. ,forEach처럼 break문을 사용할수 없다. 

// render() 밖에서 화살표 함수를 쓰지 않으면 this가 undefined가 되어서 연결해주는 bind() 함수를 써야한다.
// 화살표 함수를 사용하면 자동으로 바인딩된다.
export default NumBaseball;