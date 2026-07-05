"use client";

function Box(props: any) {
    return (
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={props.color ?? "lightsteelblue"} />
      </mesh>
    );
  }
export default Box;