"use-client";

import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";

interface ViewMoreWindowProps {
  label: string;
  onViewMore: () => void;
}

function ViewMoreWindow(props: ViewMoreWindowProps) {
  return (
    <div className="absolute z-10 bottom-20 left-1/2 -translate-x-1/2 transform flex items-center">
      <Card className="w-fit col-span-12 sm:col-span-7">
        <CardFooter className="bg-slate-100 bottom-0 z-10 border-default-600 dark:border-default-100 flex gap-5">
          <div className="flex flex-grow gap-2 items-center">
            <p className="text-sm min-w-28 font-bold text-gray-900 text-center">{props.label}</p>
          </div>
          <Button radius="full" size="sm" onPress={props.onViewMore}>
            Ver
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ViewMoreWindow;
