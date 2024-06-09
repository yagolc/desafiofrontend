import ModalComp from "./components/ModalComp";
import ViewModal from "./components/ViewModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
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
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const [suppliers, setSuppliers] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [viewData, setViewData] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  async function getSuppliers() {
    const response = await api.get("/suppliers");
    setSuppliers(response.data);
  }

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleDelete = async () => {
    await api.delete(`/suppliers/${deleteId}`);
    getSuppliers();
    onDeleteClose();
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (sortConfig.key) {
      const aKey = a[sortConfig.key].toLowerCase();
      const bKey = b[sortConfig.key].toLowerCase();
      if (aKey < bKey) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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
          <Button colorScheme="blue" onClick={onModalOpen}>
            Novo Fornecedor
          </Button>
        </div>
        <Box overflow="auto" height="100%">
          <Table className="min-w-full bg-white">
            <Thead>
              <Tr className="bg-gray-200">
                <Th
                  className="px-6 py-3 border-b border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Nome
                </Th>
                <Th className="px-6 py-3 border-b border-gray-300 text-gray-700">E-mail</Th>
                <Th className="px-6 py-3 border-b border-gray-300 text-gray-700">Telefone</Th>
                <Th className="px-6 py-3 border-b border-gray-300 text-gray-700" colSpan={3}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSuppliers.map(({ id, name, email, phone }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td className="px-6 py-4 border-b border-gray-300">{name}</Td>
                  <Td className="px-6 py-4 border-b border-gray-300">{email}</Td>
                  <Td className="px-6 py-4 border-b border-gray-300">{phone}</Td>
                  <Td className="px-6 py-4 border-b border-gray-300">
                    <Search2Icon
                      fontSize={20}
                      onClick={() => {
                        setViewData({ id, name, email, phone });
                        onViewOpen();
                      }}
                    />
                  </Td>
                  <Td className="px-6 py-4 border-b border-gray-300">
                    <EditIcon
                      fontSize={20}
                      onClick={() => {
                        setDataEdit({ id, name, email, phone });
                        onModalOpen();
                      }}
                    />
                  </Td>
                  <Td className="px-6 py-4 border-b border-gray-300">
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => {
                        setDeleteId(id);
                        onDeleteOpen();
                      }}
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
      {isDeleteOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onConfirm={handleDelete}
        />
      )}
    </Flex>
  );
};

export default App;
