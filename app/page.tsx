import React from 'react'
import Image from "next/image";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import {cn, formatCurrency} from "@/lib/utils";
import {TrendingDown, TrendingUp} from "lucide-react";
import {fetcher} from "@/lib/coingecko.actions";

const columns: DataTableColumn<TrendingCoin>[] = [
    {
        header: "Name",
        cellClassName: "name-cell",
        cell: (coin) => {
            const item = coin.item;
            return (
                <Link href={`/coin/${item.id}`} key={item.id}>
                    <Image src={item.large} alt={item.name} width={36} height={36} />
                    <p>{item.name}</p>
                </Link>
            )
        }
    },
    {
        header: "Price",
        cellClassName: "name-cell",
        cell: (coin) => {
            const item = coin.item;
            const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

            return (
                <div className={cn('price-change', isTrendingUp ? "text-green-500" : "text-red-500")}>
                    <p>{isTrendingUp ? <TrendingUp /> : <TrendingDown width={16} height={16}/>}</p>
                </div>
            )
        }
    },
    {
        header: "Price",
        cellClassName: "price-cell",
        cell: (coin) => coin.item.data.price
    }
]

const Home = async () => {

    const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
        dex_pair_format: 'symbol'
    })

    return (
        <main className={"main-container"}>
            <section className={"home-grid"}>
                <div id={"coin-overview"}>
                    <div className={"header pt-2"}>
                        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
                        <div className={"info"}>
                            <p>{coin.name} / {coin.symbol.toUpperCase()}</p>
                            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                        </div>
                    </div>
                </div>

                {/*<DataTable data={[]} columns={columns} rowKey={} key/>*/}
            </section>
        </main>
    )
}
export default Home
