import {
  Box,
  Heading,
  List as ListComponent,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { trpc } from "../../trpc";

export const List = () => {
  const list = trpc.getCalories.useQuery();
  const [caloriesTotal, setCaloriesTotal] = useState<number>();

  const { isSuccess, data } = list;

  useEffect(() => {
    if (!data) return;
    setCaloriesTotal(
      data.reduce((acc, curr) => {
        return acc + curr.calories;
      }, 0)
    );
  }, [isSuccess, data]);

  return (
    <>
      <Heading as="h1" m="2rem 0 .5rem ">
        I ate these
      </Heading>
      <Box m="0 0 2rem">
        <ListComponent>
          <>
            {data?.map((intake) => (
              <ListItem key={intake.id}>
                {intake.type}, {intake.calories}
              </ListItem>
            ))}
          </>
        </ListComponent>
        <Text as="b" fontSize="l">
          Total: {caloriesTotal}
        </Text>
      </Box>
    </>
  );
};
