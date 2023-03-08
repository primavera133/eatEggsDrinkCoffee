import { nanoid } from "nanoid";
import { z } from "zod";
import { PublicProcedure } from "..";

type Intake = {
  id: string;
  type: string;
  calories: number;
};

const calories: Intake[] = [
  { id: nanoid(), type: "egg", calories: 155 },
  { id: nanoid(), type: "coffee", calories: 28 },
];

export const getCaloriesRoute = (publicProcedure: PublicProcedure) => {
  return {
    getCalories: publicProcedure.query(() => {
      return calories;
    }),
    addCalories: publicProcedure
      .input(
        z.object({
          type: z.string(),
          calories: z.number(),
        })
      )
      .mutation(({ input }) => {
        calories.push({ id: nanoid(), ...input });
        return calories;
      }),
  };
};
