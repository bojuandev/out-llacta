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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform flex gap-2 p-2 bg-slate-50 rounded">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index}`}
            className="w-24 h-24 object-cover rounded cursor-pointer transition-transform hover:scale-105"
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
