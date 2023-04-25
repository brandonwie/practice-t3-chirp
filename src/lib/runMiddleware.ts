/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next/types";

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: Function
) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      console.log(result);
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default runMiddleware;
