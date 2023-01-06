import {  RenderMediaOnLambdaInput } from '@remotion/lambda'
import { renderMediaOnLambda } from '@remotion/lambda/client'
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const inputData = JSON.parse(req.body);
  console.log("Did I make it?", inputData.imageUrls);
  
 
  const webhook: RenderMediaOnLambdaInput["webhook"] = {
    url: " ",
    secret: null,
  };

  const { bucketName, renderId } = await renderMediaOnLambda({
    region: "us-east-1",
    functionName: "remotion-render-3-3-18-mem2048mb-disk2048mb-120sec",
    composition: "HelloWorld",
    serveUrl:
      "https://remotionlambda-useast1-twk7153r7y.s3.us-east-1.amazonaws.com/sites/my-video/index.html",
    codec: "h264",
    inputProps: {imageUrls: inputData.imageUrls},
    webhook: {
      url: "https://c41d-98-176-233-69.ngrok.io/api/remotion/webhook",
      secret: null
    }
  });
  console.log("returning")
  res.status(200).json({ bucketName: bucketName, renderId: renderId })

}