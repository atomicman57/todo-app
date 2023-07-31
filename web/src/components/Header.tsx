import { Flex, Text, FlexProps, TextProps } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { themeColors } from "../utils/helpers";

interface HeaderProps extends FlexProps {
  textProps?: TextProps;
}

const Header = ({ textProps, ...flexProps }: HeaderProps): ReactElement => {
  return (
    <Flex w="100%" align="center" {...flexProps}>
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        letterSpacing="5px"
        {...textProps}
        color={themeColors.darkTodoHeader}
      >
        TO-DO LIST
      </Text>
    </Flex>
  );
};

export default Header;
