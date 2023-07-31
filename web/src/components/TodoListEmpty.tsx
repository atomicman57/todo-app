import React from "react";
import { Text } from "@chakra-ui/react";
import { themeColors } from "../utils/helpers";

const TodoListEmpty: React.FC = () => (
  <Text
    color={themeColors.darkCompletedTodo}
    fontSize="18px"
    mt="40px"
    textAlign="center"
  >
    No todos to display
  </Text>
);

export default TodoListEmpty;
