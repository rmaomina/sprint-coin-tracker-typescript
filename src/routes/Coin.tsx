import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${props => props.theme.textColor};
`;

const Loading = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;

  span:first-child {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px;
  font-weight: 300;
`;

interface RouteState {
  name: string;
}

interface RouteParams {
  coinId: string;
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
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
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
  tags: [
    { id: string; name: string; coin_counter: number; ico_counter: number },
  ];
  team: [{ id: string; name: string; position: string }];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: [
    {
      explorer: string;
      facebook: string;
      reddit: string;
      source_code: string;
      website: string;
      youtube: string;
    },
  ];
  links_extended: [
    {
      url: string;
      type: string;
      stats?: {
        subscribers?: number;
        contributors?: number;
        stars?: number;
        followers?: number;
      };
    },
  ];
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();

  let CoinTitle = null;

  if (state?.name) {
    CoinTitle = state.name;
  } else if (loading) {
    CoinTitle = "Loading...";
  } else {
    CoinTitle = info?.name;
  }

  useEffect(() => {
    (async () => {
      const coinData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(coinData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{CoinTitle}</Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Source:</span>
              <span>{info?.open_source ? "✅" : "🛑"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>total Supply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Coin;
