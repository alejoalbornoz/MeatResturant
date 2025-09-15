import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import TableCellViewer from "./data-table"; // o donde lo tengas

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ActionsCell } from "./actions-cell";
import { schema } from "./data-table";
import { useSortable } from "@dnd-kit/sortable";
import { TableMeta } from "./data-table"; // Asegurate de que la ruta sea correcta

import {
  IconCircleCheckFilled,
  IconGripVertical,
  IconLoader,
} from "@tabler/icons-react";

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-4" />
      <span className="sr-only">Arrastrar orden</span>
    </Button>
  );
}

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: () => <div className="flex items-center justify-center"></div>,
    cell: () => <div className="flex items-center justify-center"></div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre y Apellido",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
  },
  {
    accessorKey: "date",
    header: "Fecha y Hora",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.date} {row.original.time}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-2 ">
        {row.original.status === "active" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "tableNumber",
    header: () => (
      <div className="text-center min-w-[50px] transform -translate-x-7">
        Mesa
      </div>
    ),
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.tableNumber}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Input
          className="h-8 w-[50px] px-0 py-0 text-center border-transparent bg-transparent shadow-none
             hover:bg-input/30 focus-visible:bg-background 
             dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
          defaultValue={row.original.tableNumber}
          id={`${row.original.id}-table`}
        />
      </form>
    ),
  },
  {
    accessorKey: "numberOfPeople",
    header: () => (
      <div className="text-center transform ">Cantidad de personas</div>
    ),
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.numberOfPeople}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Input
          className="h-8 w-[120px] text-center border-transparent bg-transparent shadow-none translate-x-20
                   hover:bg-input/30 focus-visible:bg-background 
                   dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
          defaultValue={row.original.numberOfPeople}
          id={`${row.original.id}-people`}
        />
      </form>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="w-full text-center">Número de teléfono</div>,
    cell: ({ row }) => (
      <span className="text-center block">{row.original.phoneNumber}</span>
    ),
  },
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => row.original.code,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row, table }) => (
      <ActionsCell
        code={row.original.code}
        onRemove={(code: string) =>
          (table.options.meta as TableMeta)?.removeReservation(code)
        }
      />
    ),
  },
];
