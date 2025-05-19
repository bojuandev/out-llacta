"use-client";

import { useState } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";

const images = ["/amor.jpeg", "/amor.jpeg", "/amor.jpeg"];

interface FloatingImagePanelProps {
  imagesList: string[];
}

export default function FloatingImagePanel({
  imagesList,
}: FloatingImagePanelProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if(imagesList.length === 0) return null

  return (
    <>
      <div className="absolute right-4 md:right-4 top-20 transform flex flex-col gap-1 md:gap-2 p-1 md:p-2 bg-white/40 rounded-full md:rounded overflow-y-hidden max-h-48 md:max-h-[600px]">
        {imagesList.map((src, index) => (
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
        size="xl"
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div className="w-full h-full flex items-center">
                  <img
                    src={selectedImage!}
                    alt="Expanded view"
                    className="w-full object-cover"
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
