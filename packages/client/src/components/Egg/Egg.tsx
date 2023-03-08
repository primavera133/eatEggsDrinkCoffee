import { Button } from "@chakra-ui/react";
import { trpc } from "../../trpc";

export const Egg = () => {
  const utils = trpc.useContext();
  const mutation = trpc.addCalories.useMutation();
  const addEgg = () => {
    mutation.mutate(
      {
        type: "egg",
        calories: 155,
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
      <Button onClick={addEgg} m="0 2rem 0 0">
        Eat egg
      </Button>
    </>
  );
};
