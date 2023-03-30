import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string
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
const CoinList = styled.ul`
    
`;
const Coin = styled.li`
    background-color: #fff;
    color: ${(props)=>props.theme.bgColor};
    border-radius: 16px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 0 8px #154c79;
    a{
        padding: 24px;
        transition: all .3s ease-in-out;
        display: block;
    }
    &:hover{
        a{
            color:${(props)=>props.theme.accentColor};
            letter-spacing: 4px;
        }
    }
`;

const Title=styled.h1`
    font-size: 48px;
    color: ${(props)=>props.theme.accentColor};
`;
const Loading=styled.div`
    text-align: center;
`;
const Img = styled.img`
    width: 40px;
`;
const CoinWrapper = styled.div`
    display  : flex;
    align-items: center;
    gap: 8px;
`;


function Coins() {

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)

    return (
    <Container>
        <Helmet>
            <title>
                Coins
            </title>
        </Helmet>
        <Header>
            <Title>Coins</Title>
        </Header>
        {isLoading ? 
        <Loading>코인 목록을 불러오고 있습니다...</Loading> : 
        <CoinList>
            {data?.slice(0,100).map((coin, idx) =>
                <Coin key={coin.id}>
                    <Link to={{
                        pathname:`/${coin.id}`,
                        state:{name:coin.name},
                    }}>
                        <CoinWrapper>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>{coin.name} &rarr;
                        </CoinWrapper>
                    </Link>
                </Coin>)}
        </CoinList>}
    </Container>
    );
  }
  
export default Coins;