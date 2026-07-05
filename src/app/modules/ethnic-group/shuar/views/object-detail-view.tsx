"use-client";

import { Gltf } from "@react-three/drei";
import ObjectDetail from "../../../shared/3D-components/object-detail";
import {
  ObjectData,
  ObjectProps,
} from "../../../shared/interfaces/object-props";

interface ObjectDetailViewProps {
  object: ObjectData;
}

function ObjectDetailView({ object }: ObjectDetailViewProps) {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-gray-400 to-gray-700">
      <ObjectDetail>
        <Gltf
          src={object.objectData!.srcObject}
          {...object.objectData?.objectViewProps}
        />
      </ObjectDetail>
    </div>
  );
}

export default ObjectDetailView;
