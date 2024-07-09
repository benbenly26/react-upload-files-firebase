import { useState } from "react";
import "./App.css";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { storage } from "./firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "sonner";

export default function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState(null);

  const handleUpload = () => {
    if (!imageUpload) {
      toast.error("Select an image");
      return;
    }

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const newUploadTask = uploadBytesResumable(imageRef, imageUpload);
    setUploadTask(newUploadTask);

    newUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        if (error.code === "storage/canceled") {
          toast.error("Upload canceled");
        } else {
          toast.error("Error uploading file");
          console.error("Error uploading file:", error);
        }
      },
      () => {
        toast.success("File uploaded successfully");
        setImageUpload(null);
        setUploadProgress(0);
        setUploadTask(null);
      }
    );
  };

  const handleCancel = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploadProgress(0);
    }
  };

  return (
    <>
      <Box className="App">
        <h2>File Upload</h2>
        <Box className="mt-3">
          <input
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <Button variant="outlined" onClick={handleUpload}>
            Upload
          </Button>
          {uploadProgress > 0 && (
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancel Upload
            </Button>
          )}
        </Box>
        {uploadProgress > 0 && (
          <Box mt={2}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography
              variant="body2"
              color="textSecondary"
            >{`Upload progress: ${Math.round(uploadProgress)}%`}</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
