"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/model/Category";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteCategory from "./delete-category";

export const columns: ColumnDef<Category>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const content = row.original;
      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} size={"sm"} asChild>
            <Link href={`/dashboard/category/edit/${content.id}`}>
              <Pencil className="w-4 h-4 mr-4" /> Edit
            </Link>
          </Button>
          <DeleteCategory id={content.id} />
        </div>
      );
    },
  },
];
