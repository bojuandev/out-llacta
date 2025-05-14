"use-client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Listbox,
  ListboxItem,
  cn,
} from "@heroui/react";

const images = ["/amor.jpeg", "/amor.jpeg", "/amor.jpeg"];

export default function FloatingImagePanel() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="absolute right-4 md:right-40 top-1/2 -translate-y-1/2 transform flex flex-col gap-1 md:gap-2 p-1 md:p-2 bg-slate-50 rounded-full md:rounded">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index}`}
            className="w-14 md:w-32 h-14 md:h-32 object-cover rounded-full md:rounded cursor-pointer transition-transform hover:scale-105"
            onClick={() => {
              setSelectedImage(src);
              onOpen();
            }}
          />
        ))}
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
              <ModalBody>
                <img
                  src={selectedImage!}
                  alt="Expanded view"
                  className="w-full h-full"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
