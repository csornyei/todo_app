import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import AuthContainer from "./Auth";

export default function Header() {
  return (
    <header>
      <Flex
        px="8"
        py="2"
        background="gray.300"
        justify="space-between"
        alignItems="center"
      >
        <Heading as="h1" size="lg">
          Todo App
        </Heading>
        <AuthContainer />
      </Flex>
    </header>
  );
}
