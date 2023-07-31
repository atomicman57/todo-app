import React, { useState } from "react";
import { Center, Circle, Flex, Image, Text } from "@chakra-ui/react";
import { DragHandleIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { themeColors } from "../utils/helpers";
import { TodoItemProps } from "../types/todo.type";
import checkIcon from "../assets/icons/check.svg";

const TodoItem: React.FC<TodoItemProps> = ({
  bg,
  id,
  name,
  completed,
  onButtonClick,
  onDelete,
  onEdit,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showBorder, setShowBorder] = useState(true);

  const handleButtonClick = () => {
    setIsCompleted(!isCompleted);
    onButtonClick(id, !isCompleted);
  };

  return (
    <Flex
      w="100%"
      maxW="540px"
      bg={bg}
      h="60px"
      align="center"
      px={6}
      borderBottomColor={themeColors.darkDivider}
      borderBottomWidth={1.5}
    >
      <DragHandleIcon mr={4} color={themeColors.darkTodoText} />
      <Center
        boxSize="22px"
        rounded="14px"
        _hover={{ bgGradient: "linear(to-br, #57ddff, #c058f3)" }}
        onMouseEnter={() => setShowBorder(false)}
        onMouseLeave={() => setShowBorder(true)}
      >
        <Circle
          size="20px"
          bg={themeColors.darkContainer}
          borderWidth={showBorder && !isCompleted ? 2 : 0}
          cursor="pointer"
          bgGradient={isCompleted ? "linear(to-br, #57ddff, #c058f3)" : ""}
          onClick={handleButtonClick}
        >
          <Image opacity={isCompleted ? 1 : 0} src={checkIcon} alt="" />
        </Circle>
      </Center>
      <Text
        fontSize="md"
        flex={1}
        ml={6}
        textDecorationLine={isCompleted ? "line-through" : undefined}
        textDecorationThickness="from-font"
        color={
          isCompleted ? themeColors.darkCompletedTodo : themeColors.darkTodoText
        }
        isTruncated
      >
        {name}
      </Text>
      <EditIcon
        boxSize="22px"
        cursor="pointer"
        onClick={() => onEdit(id)}
        color={themeColors.darkTodoText}
        mr={2}
        _hover={{
          color: themeColors.darkCompletedTodo,
        }}
      />
      <CloseIcon
        boxSize="16px"
        cursor="pointer"
        onClick={() => onDelete(id)}
        color={themeColors.darkTodoText}
        _hover={{
          color: themeColors.darkCompletedTodo,
        }}
      />
    </Flex>
  );
};

export default TodoItem;
