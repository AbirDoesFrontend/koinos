import React from 'react'
import {fetcher} from "@/lib/coingecko.actions";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {TrendingDown, TrendingUp} from "lucide-react";
import DataTable from "@/components/DataTable";

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

const TrendingCoins = async() => {

    const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);

    return (
        <div id={"trending-coins"}>
            <h4>Trending Coins</h4>
            <div id={"trending-coins"}>
                <DataTable columns={columns} data={trendingCoins.coins.slice(0, 6)} rowKey={(coin) => coin.item.id} tableClassName={"trending-coins-table"} headerCellClassName={"py-3!"} bodyCellClassName={"py-2!"} />
            </div>
        </div>
    )
}
export default TrendingCoins
