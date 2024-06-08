import ModalComp from "./components/ModalComp";
import ViewModal from "./components/ViewModal";
import { EditIcon, DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";

const App = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  
  const [suppliers, setSuppliers] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [viewData, setViewData] = useState({});

  async function getSuppliers() {
    const response = await api.get("/suppliers");
    setSuppliers(response.data);
  }

  useEffect(() => {
    getSuppliers();
  }, []);

  async function deleteSupplier(id) {
    await api.delete(`/suppliers/${id}`);
    getSuppliers();
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
      className="bg-gray-100"
    >
      <Box maxW={1200} w="100%" h="100%" py={10} px={6} className="bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Fornecedores</h1>
          <Button
            colorScheme="blue"
            onClick={onModalOpen}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Novo Fornecedor
          </Button>
        </div>
        <Box overflow="auto" height="100%">
          <Table className="min-w-full bg-white">
            <Thead>
              <Tr className="bg-gray-200">
                <Th className="border px-4 py-2">Nome</Th>
                <Th className="border px-4 py-2">E-mail</Th>
                <Th className="border px-4 py-2">Telefone</Th>
                <Th className="border px-4 py-2"></Th>
                <Th className="border px-4 py-2"></Th>
                <Th className="border px-4 py-2"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {suppliers.map(({ id, name, email, phone }, index) => (
                <Tr key={index} className="bg-white hover:bg-gray-50">
                  <Td className="border px-4 py-2">{name}</Td>
                  <Td className="border px-4 py-2">{email}</Td>
                  <Td className="border px-4 py-2">{phone}</Td>
                  <Td className="border px-4 py-2">
                    <Search2Icon
                      className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        setViewData({ id, name, email, phone });
                        onViewOpen();
                      }}
                    />
                  </Td>
                  <Td className="border px-4 py-2">
                    <EditIcon
                      className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        setDataEdit({ id, name, email, phone });
                        onModalOpen();
                      }}
                    />
                  </Td>
                  <Td className="border px-4 py-2">
                    <DeleteIcon
                      className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => deleteSupplier(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isModalOpen && (
        <ModalComp
          isOpen={isModalOpen}
          onClose={onModalClose}
          getSuppliers={getSuppliers}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
      {isViewOpen && (
        <ViewModal
          isOpen={isViewOpen}
          onClose={onViewClose}
          viewData={viewData}
        />
      )}
    </Flex>
  );
};

export default App;
