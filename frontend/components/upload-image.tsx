import { createStyles, FileInput } from "@mantine/core"
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";

export function UploadImage({ imageIndex, updateImageUrl }: { imageIndex: number, updateImageUrl: any }) {
  const { classes } = useStyles();
  let [imageUrl, setImageUrl] = useState<string>("/i-need-image.png")
  let { uploadToS3 } = useS3Upload();


  let handleFileChange = async (file: any) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
    updateImageUrl(url, imageIndex)
  };


  return (
    <div className={classes.imageUpload}>
      <FileInput
        placeholder="Pick an image"
        label={`Image ${imageIndex + 1}`}
        description=".png or .jpg only"
        radius="md"
        size="lg"
        withAsterisk
        className={classes.fileInput}
        onChange={handleFileChange}
      />

      <img className={classes.imageThumbnail} src={imageUrl} />
    </div>
  )
}

const useStyles = createStyles((theme) => ({
  imageThumbnail: {
    maxHeight: '150px'
  },
  imageUpload: {
    minHeight: '200px',
    display: 'flex'
  },
  fileInput: {
    width: '40%',
    marginRight: '5rem'
  }
}
))