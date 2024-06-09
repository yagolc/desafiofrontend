import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';

const ViewModal = ({ isOpen, onClose, viewData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="p-4">
        <ModalHeader className="text-lg font-bold">Detalhes do Fornecedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col space-y-4">
            <div>
              <Text className="text-sm font-semibold">Nome</Text>
              <Text className="text-md">{viewData.name}</Text>
            </div>
            <div>
              <Text className="text-sm font-semibold">E-mail</Text>
              <Text className="text-md">{viewData.email}</Text>
            </div>
            <div>
              <Text className="text-sm font-semibold">Telefone</Text>
              <Text className="text-md">{viewData.phone}</Text>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewModal;
