import { Button } from "@chakra-ui/react";
import { trpc } from "../../trpc";

export const Coffee = () => {
  const utils = trpc.useContext();
  const mutation = trpc.addCalories.useMutation();
  const drinkCoffee = () => {
    mutation.mutate(
      {
        type: "coffee",
        calories: 28,
      },
      {
        onSuccess: () => {
          utils.getCalories.invalidate();
        },
      }
    );
  };

  return (
    <>
      <Button onClick={drinkCoffee}>Drink coffee</Button>
    </>
  );
};
