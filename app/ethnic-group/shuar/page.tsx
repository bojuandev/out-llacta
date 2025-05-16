"use client";

import { useMemo, useState } from "react";
import PanelView from "@/app/modules/ethnic-group/shuar/views/panel-view";
import ObjectDetailView from "@/app/modules/ethnic-group/shuar/views/object-detail-view";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";
import InterfaceLayout from "@/app/modules/shared/layouts/interface-layout";
import {
  mainShuarData,
  objectsOfPanel,
} from "@/app/modules/shared/data/shuar-data";
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";

const Shuar = () => {
  const [breadcrumbList, setBreadcrumb] = useState<ObjectDetected[]>([]);
  const [objectDetected, setObjectDetected] = useState<ObjectDetected | null>(
    null
  );

  const [showReturnButton, setShowReturnButton] = useState<boolean>(false);

  const currentDataView = useMemo(
    () => breadcrumbList.at(-1),
    [breadcrumbList]
  );


  const handleObjectDetected = (objectDetected: ObjectDetected) => {
    setObjectDetected(objectDetected.isEnter ? objectDetected : null);
  };

  const handleGoView = (objectDetected: ObjectDetected) => {
    const newbreadcrumb = [...breadcrumbList];
    newbreadcrumb.push(objectDetected);
    setBreadcrumb(newbreadcrumb);

    setShowReturnButton(newbreadcrumb.length > 0);
    setObjectDetected(null);
  };

  const handleReturnView = () => {
    const newbreadcrumb = [...breadcrumbList];
    newbreadcrumb.pop();
    setBreadcrumb(newbreadcrumb);

    setShowReturnButton(newbreadcrumb.length > 0);
    setObjectDetected(null);
  };

  const getDataOfPanel = (): ObjectData[] => {
    if (!currentDataView) return mainShuarData;

    return objectsOfPanel[currentDataView.id] ?? [];
  };

  return (
    <InterfaceLayout
      showReturnButton={showReturnButton}
      objectDetected={objectDetected}
      goView={handleGoView}
      returnView={handleReturnView}
      currentObject={currentDataView}
    >
      {(loading) => (
        <>
          {!currentDataView && (
            <PanelView
              objectsOfPanel={getDataOfPanel()}
              objectDetected={handleObjectDetected}
              loading={loading}
            />
          )}

          {currentDataView?.type === "panel" && (
            <PanelView
              objectsOfPanel={getDataOfPanel()}
              objectDetected={handleObjectDetected}
              loading={loading}
            />
          )}

          {currentDataView?.type === "object" && (
            <ObjectDetailView object={currentDataView} />
          )}
        </>
      )}
    </InterfaceLayout>
  );
};

export default Shuar;
