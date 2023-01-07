import { getRenderProgress, RenderProgress } from '@remotion/lambda/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const inputData = JSON.parse(req.body);
  console.log("RenderProgress inputData: ", inputData);

  const progress = await getRenderProgress({
    renderId: inputData.renderId,
    bucketName: inputData.bucketName,
    functionName: "remotion-render-3-3-18-mem2048mb-disk2048mb-120sec",
    region: "us-east-1",
  });

  res.status(200).json({ progress: progress })

}