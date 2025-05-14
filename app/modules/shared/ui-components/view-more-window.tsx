"use-client";

import { Button } from "@heroui/react";

interface ViewMoreWindowProps {
  label: string;
  onViewMore: () => void;
}

function ViewMoreWindow(props: ViewMoreWindowProps) {
  return (
    <div className="absolute z-10 bottom-14 left-1/2 -translate-x-1/2 transform flex items-center gap-4 rounded-[16px] p-6 bg-slate-50 shadow-lg shadow-slate-500/50">
      <span className="text-2xl font-semibold">{props.label}</span>
      <Button className="text-slate-50 bg-slate-600" onPress={props.onViewMore}>
        Ver
      </Button>
    </div>
  );
}

export default ViewMoreWindow;
