import { downloadMedia } from "@remotion/lambda";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const inputData = JSON.parse(req.body);
  console.log("downloadRender inputData: ", inputData);

  const { outputPath, sizeInBytes } = await downloadMedia({
    bucketName: "remotionlambda-useast1-twk7153r7y",
    region: "us-east-1",
    renderId: inputData.renderId,
    outPath: "out.mp4",
    onProgress: ({ totalSize, downloaded, percent }) => {
      console.log(
        `Download progress: ${totalSize}/${downloaded} bytes (${(
          percent * 100
        ).toFixed(0)}%)`
      );
    },
  });

  console.log(outputPath); // "/Users/yourname/remotion-project/out.mp4"
  console.log(sizeInBytes); // 21249541
}