import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type ProblemSummary } from "@/types/problem";

const difficultyConfig = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
};

export const columns: ColumnDef<ProblemSummary>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 font-semibold"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-foreground hover:text-primary cursor-pointer transition-colors">
        {row.getValue("title")}
      </span>
    ),
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 font-semibold"
      >
        Difficulty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue(
        "difficulty",
      ) as keyof typeof difficultyConfig;
      return (
        <Badge
          variant="outline"
          className={`font-medium ${difficultyConfig[difficulty] ?? ""}`}
        >
          {difficulty}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-normal">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1 max-w-50">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground"
            >
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "solvedCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 font-semibold"
      >
        Solved
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const solved = row.getValue("solvedCount") as number;
      const attempted = row.getValue("attemptedCount") as number;
      const rate = attempted > 0 ? Math.round((solved / attempted) * 100) : 0;
      return (
        <div className="text-sm">
          <span className="font-medium">{solved.toLocaleString()}</span>
          <span className="text-muted-foreground ml-1">({rate}%)</span>
        </div>
      );
    },
  },
  {
    accessorKey: "attemptedCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 font-semibold"
      >
        Attempted
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {(row.getValue("attemptedCount") as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return isActive ? (
        <div className="flex items-center gap-1.5 text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-medium">Active</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <XCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Inactive</span>
        </div>
      );
    },
  },
];
