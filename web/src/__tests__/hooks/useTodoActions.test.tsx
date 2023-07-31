import React from "react";
import {
  renderHook,
  act,
  WrapperComponent,
} from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import useTodoActions from "../../hooks/useTodoActions";
import {
  addTodoApi,
  deleteTodoApi,
  getTodosApi,
  updateTodoApi,
  reorderTodosApi,
} from "../../services/todos";

jest.mock("../../services/todos");
jest.mock("./../../hooks/useErrorToast");

const queryClient = new QueryClient();

const wrapper: WrapperComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTodoActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch todos on initial render", async () => {
    (getTodosApi as jest.Mock).mockResolvedValue({ todos: [] });
    const { result, waitFor } = renderHook(() => useTodoActions(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => !result.current.isLoading);

    expect(getTodosApi).toHaveBeenCalledTimes(1);
    expect(result.current.todos).toEqual([]);
  });

  it("should add todo", async () => {
    const newTodo = { name: "Test Todo", completed: false, sort: 0 };
    const addedTodo = { id: 1, name: "Test Todo", completed: false, sort: 0 };
    (addTodoApi as jest.Mock).mockResolvedValue({ todo: addedTodo });

    const { result } = renderHook(() => useTodoActions(), { wrapper });
    await act(async () => {
      await result.current.addTodoMutation.mutateAsync(newTodo);
    });

    expect(addTodoApi).toHaveBeenCalledWith(newTodo);
  });

  it("should update todo", async () => {
    const updatedTodo = { id: 1, name: "Updated Todo", completed: false };
    (updateTodoApi as jest.Mock).mockResolvedValue(updatedTodo);

    const { result } = renderHook(() => useTodoActions(), { wrapper });
    await act(async () => {
      await result.current.updateTodoMutation.mutateAsync(updatedTodo);
    });

    expect(updateTodoApi).toHaveBeenCalledWith(updatedTodo);
  });

  it("should delete todo", async () => {
    const todoId = 1;
    (deleteTodoApi as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodoActions(), { wrapper });
    await act(async () => {
      await result.current.deleteTodoMutation.mutateAsync(todoId);
    });

    expect(deleteTodoApi).toHaveBeenCalledWith(todoId);
  });

  it("should reorder todos", async () => {
    const todos = [
      { id: 1, name: "Todo 1", completed: false, sort: 0 },
      { id: 2, name: "Todo 2", completed: false, sort: 1 },
    ];
    (reorderTodosApi as jest.Mock).mockResolvedValue({ todos });

    const { result } = renderHook(() => useTodoActions(), { wrapper });
    await act(async () => {
      await result.current.reorderTodoMutation.mutateAsync(todos);
    });

    expect(reorderTodosApi).toHaveBeenCalledWith(todos);
  });
});
