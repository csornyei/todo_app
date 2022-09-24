import React, { useState, useContext } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { UserContext } from "../state/UserContext";

type NewTodoProps = {
  addTodo: (title: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = ({ addTodo }) => {
  const user = useContext(UserContext);
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
        size="md"
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
        cursor="pointer"
        data-cy="todo-input-submit"
        children={
          !!user ? (
            <CheckIcon color="green.500" />
          ) : (
            <Tooltip label="Todos are only saved in local storage">
              <CheckIcon color="green.500" />
            </Tooltip>
          )
        }
      />
    </InputGroup>
  );
};

export default NewTodo;
