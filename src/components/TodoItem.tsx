import React from "react";
import { Checkbox, Flex, Spacer, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type TodoItemProps = {
  completed: boolean;
  title: string;
  changeTodo: (title: string, completed: boolean) => void;
  removeTodo: (title: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  completed,
  title,
  changeTodo,
  removeTodo,
}) => {
  return (
    <Flex
      data-cy="todo-item"
      px="8"
      py="2"
      align="center"
      wrap="nowrap"
      w="50%"
    >
      <Checkbox
        id={`${title}-checkbox`}
        data-cy="todo-item-checkbox"
        pr="2"
        size="lg"
        colorScheme="green"
        isChecked={completed}
        onChange={(e) => {
          changeTodo(title, e.target.checked);
        }}
      />
      <label htmlFor={`${title}-checkbox`}>
        <Text data-cy="todo-item-title" as={completed ? "s" : "p"}>
          {title}
        </Text>
      </label>
      <Spacer />
      <CloseIcon
        data-cy="todo-item-delete"
        h="4"
        w="4"
        color="red.600"
        cursor="pointer"
        onClick={() => removeTodo(title)}
      />
    </Flex>
  );
};

export default TodoItem;
