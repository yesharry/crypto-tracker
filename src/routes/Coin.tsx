import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

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

  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
        <button>go home</button>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
