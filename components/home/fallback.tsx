import React from "react";
import DataTable from "@/components/DataTable";

export const CoinOverviewFallback = () => {
  return (
    <div id={"coin-overview-fallback"}>
      <div className={"header"}>
        <div className={"header-image skeleton"} />
        <div className={"info"}>
          <div className={"header-line-sm skeleton"} />
          <div className={"header-line-lg skeleton"} />
        </div>
      </div>
      <div className={"chart skeleton"}>
        <div className={"chart-skeleton skeleton"} />
      </div>
    </div>
  );
};

const trendingColumns: DataTableColumn<number>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: () => (
      <div className={"name-link"}>
        <div className={"name-image skeleton"} />
        <div className={"name-line skeleton"} />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "change-cell",
    cell: () => (
      <div className={"change-cell"}>
        <div className={"change-line skeleton"} />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => (
      <div className={"price-change"}>
        <div className={"price-line skeleton"} />
      </div>
    ),
  },
];

export const TrendingCoinsFallback = () => {
  return (
    <div id={"trending-coins-fallback"}>
      <h4>Trending Coins</h4>
      <div className={"trending-coins-table"}>
        <DataTable
          columns={trendingColumns}
          data={[1, 2, 3, 4, 5, 6]}
          rowKey={(row) => row}
          tableClassName={"trending-coins-table"}
          headerCellClassName={"py-3!"}
          bodyCellClassName={"py-2!"}
        />
      </div>
    </div>
  );
};
