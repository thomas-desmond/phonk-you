import {
  validateWebhookSignature,
  WebhookPayload,
} from "@remotion/lambda/client";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // validateWebhookSignature({
  //   secret: process.env.WEBHOOK_SECRET as string,
  //   body: req.body,
  //   signatureHeader: req.headers["x-remotion-signature"] as string,
  // });
  console.log("In The Webhook: ", req );

  //If code reaches this path, the webhook is authentic.
  if (req.body) {
    const payload = req.body as WebhookPayload;
    if (payload.type === "success") {
      console.log("Good Stuff");
      console.log("That bitch cost: ", payload.costs.estimatedCost);
      // ...
    } else if (req.body.type === "timeout") {
      console.log("Bad Stuff");
      // ...
    }

  }

  res.status(200).json({
    success: true,
  });
}