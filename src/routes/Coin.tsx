import { useParams } from "react-router-dom";

function Coin() {
  // const params = useParams();
  // url의 파라미터 부분을 잡아내고 싶을 때 useParams 훅을 이용하면 된다.
  // console.log(params);
  // useParams Hook은 우리가 만약 console.log로 파라미터를 확인한다면, url의 파라미터들을 우리에게 준다.

  // 이제 useParams Hook을 사용하여 받아온 coninId를 잡아내 보자.
  const { coinId } = useParams();
  // 강의에서는 useParams가 받아온 coinId의 타입이 뭔지 모르기 때문에
  // 컴포넌트 밖에 interface로 타입선언을 해주고
  // interface RouteParams {
  // coinId: string;
  // }
  // 컴포넌트 안에서 타입 지정 해주라고 했지만
  // const {coinId} = useParams<RouteParam>();
  // react-router-dom v6 이후에는 useParams에 따로 타입 지정을 안해도
  // 알아서 string or undefined로 타입을 지정한다고 함.

  return <h1>Coin: {coinId}</h1>;
}
export default Coin;
