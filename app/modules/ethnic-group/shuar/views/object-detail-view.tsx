"use-client";

import { Gltf } from "@react-three/drei";
import ObjectDetail from "../../../shared/components/object-detail";
import { ObjectProps } from "../../../shared/interfaces/object-props";
import InterfaceLayout from "@/app/modules/shared/layouts/interface-layout";

interface ObjectDetailViewProps {
  src: string;
  properties?: ObjectProps;
}

function ObjectDetailView({ src, properties }: ObjectDetailViewProps) {
  return (
    <ObjectDetail>
      <Gltf src={src} {...properties} />
    </ObjectDetail>
  );
}

export default ObjectDetailView;
