import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Box,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../lib/axios';


const ModalComp = ({isOpen, onClose, getSuppliers, dataEdit, setDataEdit}) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");
  const [phone, setPhone] = useState(dataEdit.phone || "");

  async function handleSubmit() {
    if (!name || !email || !phone) 
      return;
    if(!dataEdit.id){
      await api.post("/suppliers", {
        name,
        email,
        phone,
      })
    }else{
      await api.put(`/suppliers/${dataEdit.id}`, {
        name,
        email,
        phone,
      })
    }
   
    getSuppliers();
    clear();
    onClose();
  };
  function clear () {
    setDataEdit({});
  }
  function closeModal(){
    clear();
    onClose();
  }

  return(
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>

        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Cadastro de Fornecedor</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Numero</FormLabel>
                <Input
                  type='number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="start">
            <Button colorScheme = "green" mr ={3} onClick={handleSubmit} disabled={!name || !email || !phone} >
              Salvar
            </Button>
            <Button colorScheme = "red" onClick={closeModal}>
              Cancelar
            </Button>

          </ModalFooter>
        </ModalContent>

      </Modal>

    </>
  )
}
export default ModalComp;