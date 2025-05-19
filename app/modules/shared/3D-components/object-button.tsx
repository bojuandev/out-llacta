import { Button } from "@heroui/react";

interface ObjectButtonProps {
  label: string;
  onClick?: () => void;
}

function ObjectButton({ label, onClick }: ObjectButtonProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md gap-4">
      <span>{label}</span>
      <Button color="primary" onPress={onClick}>
        Visitar
      </Button>
    </div>
  );
}

export default ObjectButton;
