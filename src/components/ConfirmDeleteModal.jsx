import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
  } from '@chakra-ui/react';
  
  const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="p-4">
          <ModalHeader className="text-lg font-bold">Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza de que deseja excluir este fornecedor?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ConfirmDeleteModal;
  