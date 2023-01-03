import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    
    // Inicia com dados de edição e, se não for ediição, com dados vazios
    const [name, SetName] = useState(dataEdit.name || "");
    const [email, SetEmail] = useState(dataEdit.email || "");

    const handleSave = () => {
        if(!name || !email) return;

        if(emailAlredyExists()){
            return alert("Email já cadastrado");
        }

        if(Object.keys(dataEdit).length){
            data[dataEdit.index] = {name, email};
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email }]
            : [...(data ? data : [])]

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
        setData(newDataArray);
        onClose();
    };

    const emailAlredyExists = () => {
        if(dataEdit.email !== email && data?.length){
            return data.find((item) => item.email === email);
        }
        return false;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>

                    <ModalHeader>Cadastro de Clientes</ModalHeader>
                    <ModalCloseButton />
                    

                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => SetName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => SetEmail(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>


                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SAVE
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCEL
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;