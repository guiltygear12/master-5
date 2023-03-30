import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps{
    coinId: string;
}
interface IHistoricalData{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number
}

function Chart({coinId}:ChartProps){
    const{isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId], ()=> fetchCoinHistory
    (coinId))
    console.log(data)
    return(
        <div>
            <h1>{coinId}</h1>
            {isLoading ? "Loading Chart..." : 
            <ApexCharts 
                type="line" 
                series={[
                    {
                        name:"Price",
                        data:data?.map((itm)=>itm.close) ?? []
                    },
                ]} 
                options={{
                    theme:{
                        mode:"dark"
                    },
                    chart:{
                        height:300,
                        width:500,
                        toolbar:{
                            show:false
                        },
                        background:"transparents"
                    },
                    grid:{
                        show:false
                    },
                    stroke:{
                        curve:"smooth",
                        width:4
                    },
                    yaxis:{
                        show:false,
                    },
                    xaxis:{
                        labels:{
                            show:false,
                            datetimeFormatter:{month:"mm 'yy"}
                        },
                        axisTicks:{
                            show:false
                        },
                        axisBorder:{
                            show:false
                        },
                        type:"datetime",
                        categories: data?.map((itm)=>itm.time_close)
                    },
                    fill:{
                        type:"gradient",
                        gradient:{gradientToColors:["#B9F3E4"], stops:[0,100]}
                    },
                    colors:["#537FE7"],
                    tooltip:{
                        y:{
                            formatter: (val)=>`$ ${val.toFixed(2)}`
                        }
                    },
                }}
            />}
        </div>
    )
}

export default Chart;