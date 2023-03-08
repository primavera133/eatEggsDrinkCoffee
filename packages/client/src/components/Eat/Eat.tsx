import { Box, Button, FormControl, Heading, Input } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { trpc } from "../../trpc";
import { Coffee } from "../Coffee";
import { Egg } from "../Egg";

export const Eat = () => {
  const utils = trpc.useContext();
  const mutation = trpc.addCalories.useMutation();
  const [type, setType] = useState<string>("");
  const [calories, setCalories] = useState<number | "">("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(111);

    if (type && calories) {
      mutation.mutate(
        {
          type,
          calories,
        },
        {
          onSuccess: () => {
            utils.getCalories.invalidate();
          },
        }
      );
      setType("");
      setCalories("");
    }
  };

  return (
    <>
      <Heading as="h2" m="0 0 .5rem">
        Eat food
      </Heading>

      <Box m="0 0 0.5rem">
        <Egg />
        <Coffee />
      </Box>

      <FormControl as="form" onSubmit={handleSubmit} w="40rem">
        <Box as="label" htmlFor="type">
          Other stuff
        </Box>
        <Input
          id="type"
          value={type}
          placeholder="some other food"
          onChange={(e) => setType(e.target.value)}
          m="0 0 1rem"
        />
        <Box as="label" htmlFor="calories">
          Calories
        </Box>
        <Input
          placeholder="calories"
          value={calories}
          onChange={(e) => setCalories(parseInt(e.target.value, 10))}
          m="0 0 1rem"
        />

        <Button size="lg" type="submit">
          Eat it
        </Button>
      </FormControl>
    </>
  );
};
