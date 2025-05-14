"use-client";

import { Button } from "@heroui/react";

interface ViewMoreWindowProps {
  label: string;
  onViewMore: () => void;
}

function ViewMoreWindow(props: ViewMoreWindowProps) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform flex items-center gap-4 roundeds p-2 bg-slate-50">
      <span>{props.label}</span>
      <Button color="primary" onPress={props.onViewMore}>
        Ver
      </Button>
    </div>
  );
}

export default ViewMoreWindow;
