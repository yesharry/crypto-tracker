import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    /* 글씨 밖까지 클릭되게 하려면 anchor에게 display block을 해주면 된다. */
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      /* 모든 react router link 들이 결국에는 anchor로 바뀔 것이기 때문에
      a에 스타일을 주면 된다. */
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// 우리는 typescript한테 우리 데이터가 어떻게 생겼는지 알려주어야 한다.
// API에서 가져오는 데이터도 똑같이 typescript에게 뭐가 오는지 알려줘야 한다.
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  // useSetRecoilState는 value를 설정(set)하는 function이다.
  // 이 function은 react의 setState와 같은 방식으로 작동한다.
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // useQuery hook은 너의 fetcher 함수를 부르고
  // fetcher 함수가 loading중이라면 react query는 여기서 그걸 알려줄거다.
  // useQuery는 fetcher 함수를 부르고 fetcher 함수가 끝나면
  // react query는 이 json을 data에 넣을거다.
  // 기본적으로 우리가 위에서 했던 것들이다.
  // fetcher 함수가 끝나면 isLoading을 false로 두었고
  // fetcher 함수가 끝나면 data를 state에 넣었지.

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                }}
                state={{ name: coin.name }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
            // 링크를 연결할 때 a태그를 쓰면 새로고침 해버리기 때문에 a 태그를 쓰지 않고 <Link>를 쓸 거다.
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;

// 만약 우리가 원한다면 link를 통해서 다른 화면에 정보를 보낼 수도 있다.
// 이번에는 우리가 보이지 않는 방식으로(비하인드 더 씬) 데이터를 어떻게 보내는지 알아볼거다.

// 우리가 화면 이동할 때 데이터를 보낸다는 것은
// parameter를 이용해서 url에게 코인에 대한 정보를 넘기는 거잖아.
// 이런 방식으로 한 화면에서 다른 화면으로 정보를 받아올 수도 있을거다.
// 그냥 url을 쓰는 것 말고 또 다른 옵션은, state를 사용하는 거다.
// state는 아까 말했듯 비하인드 더 씬 소통 같은 거다.

// Link 컴포넌트를 사용할 때에는 두 가지의 옵션이 있다.
// 하나는 string을 이용하는 것이고,
// 또 하나는 object를 이용하는 것이다.
// object를 통해서 말 그대로 데이터 그 자체를 보낼 수도 있다.
