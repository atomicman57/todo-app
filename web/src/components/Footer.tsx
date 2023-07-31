import { Box, BoxProps } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { themeColors } from "../utils/helpers";

interface FooterProps extends BoxProps {}

const Footer = ({ ...boxProps }: FooterProps): ReactElement => {
  return (
    <Box
      position="absolute"
      alignSelf="center"
      bottom="3"
      fontSize="12px"
      mt={2}
      {...boxProps}
      color={themeColors.darkTodoText}
    >
      Made with ❤️ by Blessing Philips{" "}
    </Box>
  );
};

export default Footer;
