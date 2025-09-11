// ActionsCell.tsx
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";

type ActionsCellProps = {
  code: string;
  onRemove: (code: string) => void; // function passed from DataTable
};

export const ActionsCell: React.FC<ActionsCellProps> = ({ code, onRemove }) => {
  const handleCancel = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/reservation/cancel/${code}`,
        { method: "PATCH", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) throw new Error("Error al cancelar");

      toast.success("Reserva cancelada");
    } catch (error) {
      toast.error("No se pudo cancelar la reserva");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/reservation/${code}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      toast.success("Reserva eliminada");

      // Remove from DataTable state
      onRemove(code);
    } catch (error) {
      toast.error("No se pudo eliminar la reserva");
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>
          <Link href={`/dashboard/edit/${code}`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCancel}>Cancelar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
