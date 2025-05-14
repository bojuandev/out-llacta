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

function Menu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        size="xs"
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Menú
              </ModalHeader>
              <ModalBody>
                <div className="w-full  mb-4">
                  <Listbox
                    aria-label="Listbox menu with icons"
                    variant="faded"
                    onAction={(key) => console.log(key)}
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
