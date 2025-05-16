"use-client";

import { Gltf } from "@react-three/drei";
import ObjectDetail from "../../../shared/components/object-detail";
import { ObjectData, ObjectProps } from "../../../shared/interfaces/object-props";

interface ObjectDetailViewProps {
 object: ObjectData
}

function ObjectDetailView({ object }: ObjectDetailViewProps) {
  return (
    <ObjectDetail>
      <Gltf src={object.objectData!.srcObject} {...object.objectData?.objectViewProps} />
    </ObjectDetail>
  );
}

export default ObjectDetailView;
