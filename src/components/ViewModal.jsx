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
  } from '@chakra-ui/react';
  
  const ViewModal = ({ isOpen, onClose, viewData }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Fornecedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <p><strong>Nome:</strong> {viewData.name}</p>
              <p><strong>Email:</strong> {viewData.email}</p>
              <p><strong>Numero:</strong> {viewData.phone}</p>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ViewModal;
  