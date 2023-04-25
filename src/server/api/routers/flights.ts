import { z } from "zod";
import { publicProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";

export const flightsRouter = createTRPCRouter({
  validateFlight: publicProcedure
    .input(
      z.object({
        actualWeight: z.number(),
        bcbp: z.string(),
        biometric: z.boolean(),
        flightId: z.string(),
        vertiPortId: z.string(),
        operatorId: z.string(),
        profile: z.string(),
        timeStamp: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      console.log(input);

      return input;
    }),
});
