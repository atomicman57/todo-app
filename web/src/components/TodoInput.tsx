import React from "react";
import { Circle, Flex, Input } from "@chakra-ui/react";
import { TodoInputProps } from "../types/todo.type";
import { themeColors } from "../utils/helpers";

const TodoInput: React.FC<TodoInputProps> = ({
  name,
  onChange,
  onButtonClick,
  onEnterPress,
}) => {
  return (
    <Flex
      bg={themeColors.darkContainer}
      h="60px"
      mt="30px"
      mb="20px"
      align="center"
      px={6}
      rounded={6}
    >
      <Circle
        size="20px"
        borderWidth={2}
        cursor="pointer"
        _active={{ bgGradient: "linear(to-br, #57ddff, #c058f3)" }}
        onClick={onButtonClick}
      />
      <Input
        fontSize="md"
        textAlign="left"
        placeholder="Add a task"
        border="none"
        px={0}
        ml={6}
        transition="none"
        color={themeColors.darkTodoText}
        padding={3}
        value={name}
        onChange={onChange}
        onKeyPress={(e) => e.key === "Enter" && onEnterPress()}
        _focus={{ outline: 0 }}
      />
    </Flex>
  );
};

export default TodoInput;
