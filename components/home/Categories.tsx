import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const Categories = async () => {
  const categories = await fetcher<Category[]>("/coins/categories");

  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => category.name,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: (category) =>
        category.top_3_coins.map((gainers, index) => (
          <Image
            src={gainers}
            alt={gainers}
            key={index}
            width={28}
            height={28}
          />
        )),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (category) => formatCurrency(category.market_cap),
    },
  ];

  return (
    <div id={"categories"} className={"custom-scrollbar"}>
      <h4>Top Categories</h4>

      <DataTable
        columns={columns}
        data={categories.slice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName={"mt-3"}
      />
    </div>
  );
};
export default Categories;
