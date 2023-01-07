import { Container, createStyles, Grid } from '@mantine/core'
import { useS3Upload } from 'next-s3-upload'
import { useEffect, useState } from 'react'

export default function Home() {
  const { classes } = useStyles();
  let [bucketName, setBucketName] = useState<string>("remotionlambda-useast1-twk7153r7y");
  let [renderId, setRenderId] = useState<string>("");
  let [videoUrl, setVideoUrl] = useState<string>("");

  // let [imageUrls, setImageUrls] = useState<string[]>(
  //   ["https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/fefc0190-9702-4980-86d1-d5dd9f918459/dev-rel-mentorship.png",
  //     "https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/fefc0190-9702-4980-86d1-d5dd9f918459/dev-rel-mentorship.png",
  //     "https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/fefc0190-9702-4980-86d1-d5dd9f918459/dev-rel-mentorship.png",
  //     "https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/fefc0190-9702-4980-86d1-d5dd9f918459/dev-rel-mentorship.png",
  //     "https://phonk-you-images.s3.amazonaws.com/next-s3-uploads/fefc0190-9702-4980-86d1-d5dd9f918459/dev-rel-mentorship.png"]);
  let [imageUrls, setImageUrls] = useState<string[]>(
    ["/i-need-image.png",
      "/i-need-image.png",
      "/i-need-image.png",
      "/i-need-image.png",
      "/i-need-image.png"]);
  let { uploadToS3 } = useS3Upload();

  let handleFileChange_0 = async (event: any) => {
    const file = event.target.files[0]
    let { url } = await uploadToS3(file);
    // let url  = "www.FakeUrlForNow.com";
    let newArray = [...imageUrls];
    newArray[0] = url;
    console.log(newArray)
    setImageUrls(newArray);
  };

  let handleFileChange_1 = async (event: any) => {
    const file = event.target.files[0]
    let { url } = await uploadToS3(file);
    // let url  = "www.FakeUrlForNow.com";
    let newArray = [...imageUrls];
    newArray[1] = url;
    console.log(newArray)
    setImageUrls(newArray);
  };

  let handleFileChange_2 = async (event: any) => {
    const file = event.target.files[0]
    let { url } = await uploadToS3(file);
    // let url  = "www.FakeUrlForNow.com";
    let newArray = [...imageUrls];
    newArray[2] = url;
    console.log(newArray)
    setImageUrls(newArray);
  };

  let handleFileChange_3 = async (event: any) => {
    const file = event.target.files[0]
    let { url } = await uploadToS3(file);
    // let url  = "www.FakeUrlForNow.com";
    let newArray = [...imageUrls];
    newArray[3] = url;
    console.log(newArray)
    setImageUrls(newArray);
  };

  let handleFileChange_4 = async (event: any) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0]
    let { url } = await uploadToS3(file);
    // let url  = "www.FakeUrlForNow.com";
    let newArray = [...imageUrls];
    newArray[4] = url;
    console.log(newArray)
    setImageUrls(newArray);
  };

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
    async function checkCondition() {
      const result = await fn();
      const data = await result.json()
      console.log("result", data);
      if (data.progress.done) {
        console.log("New Video Url: ", data.progress.outputFile)
        setVideoUrl(data.progress.outputFile)
        end();
      } else {
        setTimeout(checkCondition, 3000);

      }
    }

    checkCondition();
  }

  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          <h1>Phonk You</h1>

          <button onClick={generateVideo}>
            Generate a video?
          </button>

          <div className={classes.imageUpload}>
            <input
              type="file"
              name="file0"
              onChange={handleFileChange_0}
            />
            <img className={classes.imageThumbnail} src={imageUrls[0]} />
          </div>
          <div className={classes.imageUpload}>
            <input
              type="file"
              name="file1"
              onChange={handleFileChange_1}
            />
            {imageUrls[1] && <img className={classes.imageThumbnail} src={imageUrls[1]} />}
          </div>
          <div className={classes.imageUpload}>
            <input
              type="file"
              name="file2"
              onChange={handleFileChange_2}
            />
            {imageUrls[2] && <img className={classes.imageThumbnail} src={imageUrls[2]} />}
          </div>
          <div className={classes.imageUpload}>
            <input
              type="file"
              name="file3"
              onChange={handleFileChange_3}
            />
            {imageUrls[3] && <img className={classes.imageThumbnail} src={imageUrls[3]} />}
          </div>
          <div className={classes.imageUpload}>
            <input
              type="file"
              name="file4"
              onChange={handleFileChange_4}
            />
            <img className={classes.imageThumbnail} src={imageUrls[4]} />
          </div>
          <video width="720" height="1280" src={videoUrl} controls loop>
          </video>
        </Grid.Col>
      </Grid>
    </Container>

  )
}


const useStyles = createStyles((theme) => ({
  imageThumbnail: {
    maxHeight: '150px'
  },
  imageUpload: {
    minHeight: '200px',
    display: 'flex'
  }
}
))
