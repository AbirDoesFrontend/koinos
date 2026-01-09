import React from 'react'
import {fetcher} from "@/lib/coingecko.actions";
import Image from "next/image";
import {formatCurrency} from "@/lib/utils";
import {CoinOverviewFallback} from "@/components/home/fallback";
import CandleSticksChart from "@/components/CandleSticksChart";

const CoinOverview = async() => {
    try {
        const [coin, coinOHLCData] = await Promise.all([
            await fetcher<CoinDetailsData>('/coins/bitcoin', {
                dex_pair_format: 'symbol'
            }),

            await fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
                vs_currency: 'usd',
                days: 1,
                precision: 'full',
            })
        ])

        return (
            <div id={"coin-overview"}>
                <CandleSticksChart data={coinOHLCData} coinId={"bitcoin"} liveInterval={"1s"}
                                   setLiveInterval={function (interval: "1s" | "1m"): void {
                                       throw new Error("Function not implemented.");
                                   }}>
                    <div className={"header pt-2"}>
                        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
                        <div className={"info"}>
                            <p>{coin.name} / {coin.symbol.toUpperCase()}</p>
                            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                        </div>
                    </div>
                </CandleSticksChart>
            </div>
        )

    } catch (error){
       console.error("Error fetching coin overview", error)
        return <CoinOverviewFallback />
    }
}
export default CoinOverview
