export const useJoystickControls = (selector?: (state: any) => any) => {
  const state = {
    setJoystick: () => {},
  };
  return selector ? selector(state) : state;
};

export default function Controller({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <>{children}</>;
}
