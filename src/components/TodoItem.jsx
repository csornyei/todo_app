import React from "react";
import { Checkbox, Flex, Spacer, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function TodoItem({ completed, title, changeTodo, removeTodo }) {
  return (
    <Flex px="8" py="2" align="center" wrap="nowrap" w="50%">
      <Checkbox
        pr="2"
        size="lg"
        colorScheme="green"
        isChecked={completed}
        onChange={(e) => {
          console.log(e.target.checked);
          changeTodo(title, e.target.checked);
        }}
      />
      <Text as={completed ? "s" : "p"}>{title}</Text>
      <Spacer />
      <CloseIcon
        h="4"
        w="4"
        color="red.600"
        cursor="pointer"
        onClick={() => removeTodo(title)}
      />
    </Flex>
  );
}

export default TodoItem;
