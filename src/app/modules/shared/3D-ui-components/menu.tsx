import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { MenuIcon } from "../icons/menu-icon";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

type ModalContentType = "menu" | "indications" | "controls";

const titleCatalog = {
  menu: "Menú",
  indications: "Indicaciones",
  controls: "Controles",
};

function Menu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contentModalType, setContentModalType] =
    useState<ModalContentType>("menu");

  const handleChangeContentModalType = (
    contentType: ModalContentType & "exit"
  ) => {
    if (contentType === "exit") {
      return redirect("/");
    }
    setContentModalType(contentType);
  };

  useEffect(() => {
    if (!isOpen && contentModalType !== "menu") {
      setTimeout(() => {
        setContentModalType("menu");
      }, 500);
    }
  }, [isOpen]);

  const renderIndications = () => {
    return (
      <div className="flex flex-col gap-12 h-[500px] overflow-y-scroll">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
          <div className="md:w-3/5">
            <h2 className="font-bold text-2xl mb-4">Acércate a una puerta</h2>
            <p>
              A medida que te desplaces por el recorrido virtual, acércate a
              cualquiera de las puertas disponibles. Al estar lo suficientemente
              cerca, se activará automáticamente una ventana emergente en la
              pantalla. En esta ventana verás un botón interactivo que te
              permitirá acceder al panel o área correspondiente. Al hacer clic
              en este botón, serás redirigido de manera fluida al espacio
              seleccionado, donde podrás explorar los objetos y elementos
              propios de esa sección.
            </p>
          </div>
          <img
            src="/images/door-image.webp"
            alt="door"
            className="w-52 h-72 object-cover rounded"
          />
        </div>

        <div className="flex flex-col md:flex-row  gap-6 items-center md:items-end">
          <div className="md:w-3/5">
            <h2 className="font-bold text-2xl mb-4">
              Observa con detalle un objeto
            </h2>
            <p>
              Durante tu recorrido virtual, acércate a cualquiera de los objetos
              expuestos para activarlos. Al estar a corta distancia, aparecerá
              automáticamente una ventana emergente con un botón de acceso. Al
              hacer clic en dicho botón, podrás visualizar el objeto en detalle,
              incluyendo una descripción completa que contextualiza su
              relevancia. Además, tendrás acceso a diversos recursos
              complementarios como imágenes ampliadas y videos explicativos.
            </p>
          </div>
          <img
            src="/images/object-image.webp"
            alt="object"
            className="w-52 h-72 object-cover rounded"
          />
        </div>
      </div>
    );
  };

  const renderControls = () => {
    return (
      <div className="flex flex-col gap-12 h-[500px] overflow-y-scroll">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
          <div className="md:w-3/5">
            <h2 className="font-bold text-2xl mb-4">Explora el escenario</h2>
            <p>
              Para desplazarte dentro del recorrido virtual desde una
              computadora, puedes utilizar las teclas{" "}
              <strong>W, A, S y D</strong> o las teclas de dirección (arriba,
              abajo, izquierda, derecha). Estas permiten mover tu objeto 3D a
              través del escenario con fluidez. Además, puedes mover la vista
              del escenario manteniendo presionado el click derecho del mouse y
              arrastrando en la dirección deseada, lo que te da mayor control
              sobre la exploración.
            </p>
          </div>
          <img
            src="/images/keys-image.webp"
            alt="keys"
            className="w-72 h-32 object-cover rounded"
          />
        </div>

        <div className="flex flex-col md:flex-row  gap-6 items-center md:items-end">
          <div className="md:w-3/5">
            <h2 className="font-bold text-2xl mb-4">
              Explora con tu dispositivo móvil
            </h2>
            <p>
              En dispositivos móviles, encontrarás un botón en la esquina
              inferior derecha de la pantalla que, al mantenerlo presionado,
              hará que el objeto comience a caminar en línea recta. Para cambiar
              la dirección o explorar el entorno, simplemente arrastra el dedo
              sobre la pantalla, lo que te permitirá mover el escenario de
              manera intuitiva.
            </p>
          </div>
          <img
            src="/images/button-image.webp"
            alt="buttons"
            className="w-52 h-52 object-cover rounded"
          />
        </div>
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <Listbox
        aria-label="Listbox menu with icons"
        variant="faded"
        onAction={handleChangeContentModalType as any}
      >
        <ListboxItem key="indications" className="text-center">
          Indicaciones
        </ListboxItem>
        <ListboxItem key="controls" className="text-center">
          Controles
        </ListboxItem>

        <ListboxItem
          key="exit"
          className="text-danger text-center"
          color="danger"
        >
          Salir del Tour
        </ListboxItem>
      </Listbox>
    );
  };

  return (
    <>
      <div className="absolute top-6 right-6 transform">
        <Button onPress={onOpen} isIconOnly>
          <MenuIcon />
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={contentModalType === "menu" ? "xs" : "3xl"}
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center text-4xl">
                {titleCatalog[contentModalType]}
              </ModalHeader>
              <ModalBody>
                <div className="w-full my-6">
                  {contentModalType === "menu" ? renderMenu() : null}
                  {contentModalType === "indications"
                    ? renderIndications()
                    : null}
                  {contentModalType === "controls" ? renderControls() : null}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Menu;
