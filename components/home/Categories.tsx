import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "@/components/DataTable";

const Categories = async () => {
  const categories = await fetcher<Category[]>("/coins/categories");

  const columns: DataTableColumn<Category>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => category.name,
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
