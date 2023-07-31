import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoInput from "../../components/TodoInput";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../utils/helpers";

describe("TodoInput", () => {
  test("renders the TodoInput component", () => {
    render(
      <ChakraProvider theme={theme}>
        <TodoInput
          name=""
          onChange={() => {}}
          onButtonClick={() => {}}
          onEnterPress={() => {}}
        />
      </ChakraProvider>
    );
  });

  test("calls the onEnterPress function when the user presses the 'Enter' key", () => {
    const onEnterPressMock = jest.fn();
    const { getByPlaceholderText } = render(
      <ChakraProvider theme={theme}>
        <TodoInput
          name=""
          onChange={() => {}}
          onButtonClick={() => {}}
          onEnterPress={onEnterPressMock}
        />
      </ChakraProvider>
    );
    const input = getByPlaceholderText("Add a task");
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    expect(onEnterPressMock).toHaveBeenCalledTimes(1);
  });
});
