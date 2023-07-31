import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoListEmpty from "./TodoListEmpty";
import TodoListLoading from "./TodoListLoading";
import useTodoActions from "../hooks/useTodoActions";
import { getItemStyle, reorder, themeColors } from "../utils/helpers";
import { Todo, NewTodo } from "../types/todo.type";
import useErrorToast from "../hooks/useErrorToast";
import TodoEditModal from "./TodoEditModal";

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const {
    todos,
    isLoading,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    reorderTodoMutation,
  } = useTodoActions();

  // API errors are alreadly handled in useTodoActions hook
  // This is just to handle any unexpected errors
  const showErrorToast = useErrorToast();

  useEffect(() => {
    if (todos) {
      setTodoList(todos);
    }
  }, [todos]);

  const addTodo = async () => {
    try {
      if (inputValue) {
        const newTodo: NewTodo = {
          name: inputValue,
          completed: false,
          sort: todoList.length + 1,
        };
        setInputValue("");
        const { todo } = await addTodoMutation.mutateAsync(newTodo);
        const updatedTodoList = [...todoList, todo];
        setTodoList(updatedTodoList);
      }
    } catch (error) {
      showErrorToast();
    }
  };

  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        const updatedTodoList = todoList?.filter((todo) => todo.id !== id);
        if (updatedTodoList) {
          setTodoList(updatedTodoList);
          await deleteTodoMutation.mutateAsync(id);
        }
      } catch (error) {
        showErrorToast();
      }
    },
    [todoList, deleteTodoMutation, showErrorToast]
  );

  const setCompletedTodo = useCallback(
    async (id: number, completed: boolean) => {
      try {
        const updatedTodoList = todoList?.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        );
        if (updatedTodoList) {
          setTodoList(updatedTodoList);
        }
        await updateTodoMutation.mutateAsync({ id, completed });
      } catch (error) {
        showErrorToast();
      }
    },
    [todoList, updateTodoMutation, showErrorToast]
  );

  const onDragEnd = async (result: DropResult) => {
    try {
      if (!result.destination) {
        return;
      }
      const items = reorder(
        todoList,
        result.source.index,
        result.destination.index
      );
      setTodoList(items);
      await reorderTodoMutation.mutateAsync(items);
    } catch (error) {
      showErrorToast();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const openEditModal = (id: number) => {
    setEditingTodoId(id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingTodoId(null);
    setEditModalOpen(false);
  };

  const saveEditedTodo = (name: string) => {
    try {
      if (editingTodoId !== null) {
        const updatedTodoList = todoList.map((todo) =>
          todo.id === editingTodoId ? { ...todo, name } : todo
        );
        setTodoList(updatedTodoList);
        updateTodoMutation.mutate({ id: editingTodoId, name });
      }
      closeEditModal();
    } catch (error) {
      showErrorToast();
    }
  };

  const editingTodo = todoList?.find?.((todo) => todo.id === editingTodoId);

  return (
    <>
      <TodoInput
        name={inputValue}
        onChange={handleInputChange}
        onButtonClick={addTodo}
        onEnterPress={addTodo}
      />
      {isLoading ? (
        <TodoListLoading />
      ) : todoList.length > 0 ? (
        <Box>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <VStack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  borderTopRadius={6}
                  bg={themeColors.darkContainer}
                  alignItems="flex-start"
                  spacing={0}
                  overflow="hidden"
                >
                  {todoList.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={
                            getItemStyle(
                              provided.draggableProps.style
                            ) as React.CSSProperties
                          }
                        >
                          <TodoItem
                            bg={themeColors.darkContainer}
                            key={todo.id}
                            id={todo.id}
                            name={todo.name}
                            completed={todo.completed}
                            onDelete={deleteTodo}
                            onButtonClick={setCompletedTodo}
                            onEdit={openEditModal}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <TodoEditModal
                    isOpen={editModalOpen}
                    onClose={closeEditModal}
                    onSave={saveEditedTodo}
                    defaultValue={editingTodo?.name || ""}
                  />
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
          <Text
            color={themeColors.darkCompletedTodo}
            fontSize="14px"
            mt="60px"
            textAlign="center"
          >
            Drag and drop to rearrange the list
          </Text>
        </Box>
      ) : (
        <TodoListEmpty />
      )}
    </>
  );
};

export default TodoList;
