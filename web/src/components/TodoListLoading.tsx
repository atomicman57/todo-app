import React from "react";
import { Skeleton } from "@chakra-ui/react";

const TodoListLoading: React.FC = () => (
  <>
    <Skeleton height="40px" my="10px" />
    <Skeleton height="40px" my="10px" />
  </>
);

export default TodoListLoading;
