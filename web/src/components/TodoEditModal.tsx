import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { TodoEditModalProps } from "../types/todo.type";
import { themeColors } from "../utils/helpers";

const TodoEditModal: React.FC<TodoEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultValue,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (inputRef.current) {
      onSave(inputRef.current.value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={themeColors.darkContainer}>
        <ModalHeader color={themeColors.darkTodoText}>Edit Todo</ModalHeader>
        <ModalCloseButton color={themeColors.darkTodoText} />
        <ModalBody>
          <FormControl>
            <Input
              color={themeColors.darkTodoText}
              ref={inputRef}
              defaultValue={defaultValue}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={themeColors.darkTodoText}
            fontSize="md"
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            _hover={{
              bg: themeColors.darkDivider,
            }}
            fontSize="md"
            color={themeColors.darkTodoText}
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoEditModal;
