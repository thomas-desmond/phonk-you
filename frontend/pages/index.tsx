import { Button, Container, createStyles, Grid, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import { UploadImage } from '../components/upload-image';

const defaultImageUrl: string = "https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/5345d573-3f30-4b06-9723-ee08b83d719b/banana.jpg"

export default function Home() {
  const { classes } = useStyles();

  let bucketName = "remotionlambda-useast1-twk7153r7y";
  let [renderId, setRenderId] = useState<string>("");
  let [videoUrl, setVideoUrl] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);

  let [imageUrls, setImageUrls] = useState<string[]>([defaultImageUrl, defaultImageUrl, defaultImageUrl, defaultImageUrl, defaultImageUrl]);

  const generateVideo = async () => {
    setLoading(true)

    const response = await fetch("/api/renderMediaOnLambda", {
      method: "POST",
      body: JSON.stringify({ imageUrls: imageUrls })
    })
    const data = await response.json();
    setRenderId(data.renderId);
  }

  useEffect(() => {
    if (renderId != "") {
      originalPoll(checkIfRenderComplete);
    }
  }, [renderId])

  const checkIfRenderComplete = async () => {
    const response = await fetch("/api/renderProgress", {
      method: "POST",
      body: JSON.stringify({ bucketName, renderId })
    })
    return response;
  }

  async function originalPoll(fn: any) {
    setLoading(true)
    async function checkCondition() {
      const result = await fn();
      const data = await result.json()
      console.log("result", data);
      if (data.progress.done) {
        setVideoUrl(data.progress.outputFile)
        setLoading(false)
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

  const shouldDisable = () => {
    if(loading) return true;

    return !imageUrls.indexOf(defaultImageUrl);
  }

  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          <h1>Phonk You</h1>

          <UploadImage imageIndex={0} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={1} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={2} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={3} updateImageUrl={updateImageUrl} />
          <UploadImage imageIndex={4} updateImageUrl={updateImageUrl} />


          {loading && <Loader className={classes.loader} />}

          <Button
            className={classes.generateButton}
            fullWidth
            onClick={generateVideo}
            disabled={shouldDisable()}
          >
            Generate Video (I need all 5 images first)
          </Button>
          

          <video width="480" height="852" src={videoUrl} controls loop>
          </video>
        </Grid.Col>
      </Grid>
    </Container>

  )
}


const useStyles = createStyles((theme) => ({
  generateButton: {
    marginBottom: '3rem'
  },
  loader: {
    minWidth: '150px'
  }
}
))
