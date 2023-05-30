import axios from "axios";

export const s3uploadService = async (file) => {
  const { value } = file.target;
  if (!value) return;
  try {
    const data = new FormData();
    data.append("file", value);
    const sendFile = await axios({
      method: "post",
      url: "https://devs.wisengine.co:8010/api/cmgt/s3",
      headers: {
        "Authorization": `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
      },
      data,
      onUploadProgress: (progress) => {
        const { loaded, total } = progress;
        let percent = Math.floor((loaded * 100) / total);
        //setUploadProgress(percent);
      },
    });

     const sessionFiles = JSON.parse(sessionStorage.getItem("files"));

     if (sessionFiles) {
       sessionFiles.push(sendFile.data.data);
       sessionStorage.setItem("files", JSON.stringify(sessionFiles));
     } else {
       let files = [];
       files.push(sendFile.data.data);
       sessionStorage.setItem("files", JSON.stringify(files));
     }

  } catch (error) {
    throw new Error(error);
  }
};
