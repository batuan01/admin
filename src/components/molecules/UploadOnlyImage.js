import { useDropzone } from "react-dropzone";
import Notification from "../atoms/Notification";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";

export const UploadOnlyImage = ({
  lengthImage,
  selectedFiles,
  setSelectedFiles,
}) => {
  /////// kiểm tra file ảnh////////
  function isImageByExtension(fileName) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  const onDrop = async (acceptedFiles) => {
    // Kiểm tra số lượng ảnh đã chọn với số lượng tối đa cho phép
    if (lengthImage && selectedFiles.length > 0) {
      Notification.error(`You can only upload ${lengthImage} image at a time.`);
      return;
    }

    const baseArray = [];
    for (const file of acceptedFiles) {
      // filter <20mb
      if (file.size >= 20 * 1024 * 1024) {
        Notification.error("Please choose file < 20mb!");
      } else if (!isImageByExtension(file.name)) {
        Notification.error("File type does not match!");
      } else {
        try {
          baseArray.push(file);
        } catch (error) {
          console.error("Error converting to base64:", error);
        }
      }
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...baseArray]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: lengthImage ? 1 : 10,
  });

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(indexToRemove, 1);
      return updatedFiles;
    });
  };

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          border: "1px solid gray",
          cursor: "pointer",
          marginBottom: "10px",
          background: "white",
          borderRadius: "8px",
          flexGrow: "1",
        }}
      >
        <input {...getInputProps()} />
        <div className="flex flex-start items-center gap-5">
          <button
            type="button"
            className="bg-[#3699ff] text-white p-3"
            style={{ borderRadius: "6px 0 0 6px" }}
          >
            Upload
          </button>

          {selectedFiles.length > 0 ? (
            selectedFiles.map((file, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#F1EFEF",
                    padding: "10px",
                  }}
                  key={index}
                >
                  <span className="flex gap-1 items-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Image_${index + 1}`}
                      className="h-6 w-auto"
                    />
                    <span style={{ marginLeft: 10 }}>{file.name}</span>
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400">Choose file to upload</p>
          )}
        </div>
      </div>
    </>
  );
};
