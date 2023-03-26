import { useEffect, useState } from "react";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

interface Params{
    coinId:string
}
interface RouteState{
  name:string;
}
interface InfoData{
  id : string
  name : string
  symbol : string
  rank : number
  is_new : boolean
  is_active : boolean
  type : string
  logo : string
  description : string
  message : string
  open_source : boolean
  started_at : string
  development_status : string
  hardware_wallet : boolean
  proof_type : string
  org_structure : string
  hash_algorithm : string
  first_data_at : string
  last_data_at : string
}
interface PriceData{
  id : string ;
  name : string ;
  symbol : string ;
  rank : number ;
  circulating_supply : number ;
  total_supply : number ;
  max_supply : number ;
  beta_value : number ;
  first_data_at : string ;
  last_updated : string ;
  quotes : {
    USD:{
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  } ;
}

const Container = styled.div`
    padding: 0 16px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 120px;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title=styled.h1`
    font-size: 48px;
    font-weight: 600;
    color: ${(props)=>props.theme.accentColor};
`;
const Loading=styled.div`
    text-align: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  text-align: center;
`;

function Coin() {
    const { coinId } = useParams<Params>();
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [price, setPrice] = useState<PriceData>();
    // const []
    const {state} = useLocation<RouteState>();

    useEffect(()=>{
        (
          async ()=>{
            const coinInfo = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
                ).json();
            const coinPrice = await (
              await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
              ).json();
            setInfo(coinInfo);
            setPrice(coinPrice);
            setLoading(false);
          }
          
        )();
    },[coinId])

    return (
      <Container>
        <Header>
            <Title>
              Coins : {state?.name || "Loading..."}
              </Title>
        </Header>
        {loading ? 
          <Loading>코인 목록을 불러오고 있습니다...</Loading> 
          : 
          <>
            <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
            </Overview>  
            <Description>
              {info?.description}
            </Description>
            <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route>
              <Chart />
            </Route>
          </Switch>
          </>
        } 
      </Container>
    );
  }
  
  export default Coin;