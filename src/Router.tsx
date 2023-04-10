import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
        {/* 
        v6에서 nested routes를 구현하는 방법은 두 가지가 있다.
        첫 번째는 부모 route의 path 마지막에 /*를 적어 명시적으로 이 route의 내부에서
        nested route가 render될 수 있음을 표시하고 자식 route를 부모 route의 element 내부에 작성하는 방법이다.
        Coin.tsx에서는
        <Routes>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        <Routes>
        Routes가 상대경로도 지원하기 때문에 path="chart"와 같이 써도 동작한다고 한다.
        */}

        {/* 
        두 번째 방법은 자식 route를 부모 element의 내부가 아닌 route 내부에 작성하는 방법이다.
        router.tsx에서 chart와 price 컴포넌트를 import하고
        <Route path="/:coinId" element={<Coin />} />
        <Route path="price" element={<Price />} />
        <Route path="chart" element={<Chart />} />
        그리고 이 자식 route들이 어디에 render 될지 부모의 element 안에 Outlet을 이용해 표시해주면 된다.
        Coin.tsx에서, react-router-dom에서 Outlet을 import하고
        Overview와 Container 사이에 <Outlet />를 작성해주면 끝납니다.
        */}
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
