import { QueryClient, QueryClientProvider } from "react-query";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import React from "react";
import { themeColors } from "./utils/helpers";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        bg={themeColors.darkBg}
        bgRepeat="no-repeat"
        bgSize="contain"
        display="flex"
        justifyContent="center"
        minHeight="100vh"
      >
        <Flex
          direction="column"
          w="90%"
          maxW="540px"
          mt={{ base: "40px", md: "80px" }}
          mb="60px"
        >
          <Header />
          <TodoList />
          <Footer />
        </Flex>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
