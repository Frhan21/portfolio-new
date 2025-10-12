import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FC } from "react";
import Swal from "sweetalert2";

interface DeleteProps {
  id: string;
}

const DeleteCategory: FC<DeleteProps> = ({ id }) => {
  const handleDeleteCategory = async () => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (res.isConfirmed) {
      try {
        await fetch(`/api/v1/category/${id}`, {
          method: "DELETE",
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });

        window.location.reload(); 
      } catch (error: any) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Opps!",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <Button
      size={"sm"}
      variant={"destructive"}
      onClick={handleDeleteCategory}
      className="cursor-pointer"
    >
      <Trash className="w-4 h-4" />
      Delete
    </Button>
  );
};

export default DeleteCategory;