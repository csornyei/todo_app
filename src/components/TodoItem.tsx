import React from "react";
import { Checkbox, Flex, Spacer, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { TodoItem as TodoItemType } from "../utils/types";

type TodoItemProps = {
  item: TodoItemType;
  changeTodo: (todo: TodoItemType) => void;
  removeTodo: (title: string, local: boolean) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  item,
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
        id={`${item.title}-checkbox`}
        data-cy="todo-item-checkbox"
        pr="2"
        size="lg"
        colorScheme="green"
        isChecked={item.completed}
        onChange={(e) => {
          changeTodo({ ...item, completed: e.target.checked });
        }}
      />
      <label htmlFor={`${item.title}-checkbox`}>
        <Text data-cy="todo-item-title" as={item.completed ? "s" : "p"}>
          {item.title}
        </Text>
      </label>
      <Spacer />
      <CloseIcon
        data-cy="todo-item-delete"
        h="4"
        w="4"
        color="red.600"
        cursor="pointer"
        onClick={() => removeTodo(item.id, item.local)}
      />
    </Flex>
  );
};

export default TodoItem;
