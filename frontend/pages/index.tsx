import { Container, createStyles, Grid } from '@mantine/core'
import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import { arrayBuffer } from 'stream/consumers';

export default function Home() {
  const { classes } = useStyles();

  let [imageUrls, setImageUrls] = useState<string[]>(["", "", "", "", ""]);
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

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

  const asyncFunc = async () => {
    const response = await fetch("/api/renderMediaOnLambda", {
      method: "POST",
      body: JSON.stringify({ imageUrls: imageUrls })
    })
    const data = await response.json();
    console.log("This my data, ", data);
  }


  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          <button onClick={asyncFunc}>
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
