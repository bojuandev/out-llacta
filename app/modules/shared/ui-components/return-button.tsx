"use-client";

import { Button } from "@heroui/react";
import { AngleLeftIcon } from "../icons/angle-left-icon";

interface ReturnButtonProps {
  onClick: () => void;
}

function ReturnButton(props: ReturnButtonProps) {
  return (
    <div className="absolute top-6 left-6 transform">
      <Button
        color="primary"
        variant="light"
        startContent={<AngleLeftIcon />}
        onPress={props.onClick}
      >
        Regresar
      </Button>
    </div>
  );
}

export default ReturnButton;
