import { Container, createStyles, Grid, Loader } from '@mantine/core'
import { useS3Upload } from 'next-s3-upload'
import { useEffect, useState } from 'react'
import { UploadImage } from '../components/upload-image';

const bananaUrl: string = "https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/5345d573-3f30-4b06-9723-ee08b83d719b/banana.jpg"

export default function Home() {
  const { classes } = useStyles();
  let [bucketName, setBucketName] = useState<string>("remotionlambda-useast1-twk7153r7y");
  let [renderId, setRenderId] = useState<string>("");
  let [videoUrl, setVideoUrl] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);

  let [imageUrls, setImageUrls] = useState<string[]>([bananaUrl,bananaUrl,bananaUrl,bananaUrl,bananaUrl]);

  const generateVideo = async () => {
    const response = await fetch("/api/renderMediaOnLambda", {
      method: "POST",
      body: JSON.stringify({ imageUrls: imageUrls })
    })
    const data = await response.json();
    setBucketName(data.bucketName);
    setRenderId(data.renderId);
    console.log("This my data, ", data);
  }

  useEffect(() => {
    if (renderId != "") {
      originalPoll(checkIfRenderComplete, renderIsComplete);
    }
  }, [renderId])

  const checkIfRenderComplete = async () => {
    const response = await fetch("/api/renderProgress", {
      method: "POST",
      body: JSON.stringify({ bucketName, renderId })
    })
    return response;
  }

  const renderIsComplete = () => {
    console.log("I'm Done");
  };

  async function originalPoll(fn: any, end: any) {
    setLoading(true)
    async function checkCondition() {
      const result = await fn();
      const data = await result.json()
      console.log("result", data);
      if (data.progress.done) {
        console.log("New Video Url: ", data.progress.outputFile)
        setVideoUrl(data.progress.outputFile)
        setLoading(false)

        end();
      } else {
        setTimeout(checkCondition, 3000);

      }
    }

    checkCondition();
  }

  const updateImageUrl = (url: string, imageIndex: number) => {
    let newArray = [...imageUrls];
    newArray[imageIndex] = url;
    console.log(newArray)
    setImageUrls(newArray);
  }

  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          <h1>Phonk You</h1>

          <button className={classes.generateButton} onClick={generateVideo}>
            Click me after choosing your 5 .png or .jpg images below. After maybe 15 - 25 seconds your video will be at bottom of page
          </button>
          { loading && <Loader />}

          <UploadImage imageIndex={0} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={1} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={2} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={3} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={4} updateImageUrl={updateImageUrl} />

          <video width="720" height="1280" src={videoUrl} controls loop>
          </video>
        </Grid.Col>
      </Grid>
    </Container>

  )
}


const useStyles = createStyles((theme) => ({
  generateButton: {
    marginBottom: '3rem'
  }
}
))
