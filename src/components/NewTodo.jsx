import { CheckIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

function NewTodo({ addTodo }) {
  const [inputValue, setInputValue] = useState("");
  const addTodoItem = () => {
    if (inputValue.trim().length > 0) {
      addTodo(inputValue.trim());
      setInputValue("");
    }
  };
  return (
    <InputGroup
      w="40%"
      mx="8"
      my="4"
      display="flex"
      alignItems="center"
      alignContent="center"
    >
      <Input
        data-cy="todo-input"
        size="lg"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            addTodoItem();
          }
        }}
      />
      <InputRightElement
        onClick={addTodoItem}
        data-cy="todo-input-submit"
        children={<CheckIcon color="green.500" />}
      />
    </InputGroup>
  );
}

export default NewTodo;
