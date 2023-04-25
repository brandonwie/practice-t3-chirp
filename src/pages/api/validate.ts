import type { NextApiRequest, NextApiResponse, NextConfig } from "next";
import Cors from "cors";
import runMiddleware from "../../lib/runMiddleware";
import formidable, { type File, type Fields } from "formidable";
import z from "zod";

// Initialize the cors middleware
// const cors = Cors({
//   methods: ["POST"],
//   origin: "https://test.com",
//
// });

const formSchema = z.object({
  actualWeight: z.number(),
  bcbp: z.string(),
  biometric: z.boolean(),
  flightId: z.string(),
  vertiPortId: z.string(),
  operatorId: z.string(),
  profile: z.string(),
  timeStamp: z.string(),
});
type FormData = z.infer<typeof formSchema>;

function validateFormData(fields: FormData, _files?: File | File[]) {
  try {
    formSchema.parse(fields);
    return true;
  } catch (err) {
    return false;
  }
}

async function saveFormData(fields: FormData) {
  // save to persistent data store
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  // Run cors
  // await runMiddleware(req, res, cors);

  // Check if the request method is POST
  if (req.method === "POST") {
    const form = formidable({ multiples: true });

    const formData = new Promise((resolve, reject) => {
      form.parse(
        req,
        (err, fields: formidable.Fields, _files: formidable.Files) => {
          if (err) {
            reject(err);
          }
          console.log({ fields });
          resolve(fields);
        }
      );
    });

    try {
      const fields = (await formData) as FormData;

      const isValid = validateFormData(fields);
      if (!isValid) throw Error("Invalid form schema");

      try {
        await saveFormData(fields);
        res.status(200).json({
          validationSuccessful: true,
          displayScenario: "",
          displayMessage: "",
          video: false,
          videoScenario: "",
          question: false,
          questionScenario: "",
        });
        return;
      } catch (e) {
        res.status(500).send({ status: "Something went wrong." });
        return;
      }
    } catch (e) {
      res.status(400).send({ status: "invalid submission" });
      return;
    }

    // Perform validation or any other processing here
  } else {
    res.setHeader("Allow", ["POST"]);
    // stringify undefined
    res.status(405).end(`Method ${String(req.method)} Not Allowed`);
  }
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
