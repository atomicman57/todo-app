import React from "react";
import { render } from "@testing-library/react";
import Header from "../../components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../utils/helpers";

describe("Header", () => {
  test("renders the Header component", () => {
    render(
      <ChakraProvider theme={theme}>
        <Header />
      </ChakraProvider>
    );
  });
});
