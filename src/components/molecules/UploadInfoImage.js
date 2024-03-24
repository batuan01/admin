import { useDropzone } from "react-dropzone";
import Notification from "../atoms/Notification";
import { FaRegTrashCan, FaImage } from "react-icons/fa6";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FcAddImage } from "react-icons/fc";

export const UploadInfoImage = ({ selectedFiles, setSelectedFiles }) => {
  /////// kiểm tra file ảnh////////
  function isImageByExtension(fileName) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  const onDrop = async (acceptedFiles) => {
    if (selectedFiles.length > 0) {
      // Remove the existing image before adding the new one
      await handleRemoveImage(0);
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
    maxFiles: 1,
  });

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(indexToRemove, 1);
      return updatedFiles;
    });
  };

  function isLink(value) {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return urlPattern.test(value);
  }

  let imgSrc;

  if (isLink(selectedFiles[0])) {
    imgSrc = selectedFiles[0];
  } else {
    if (selectedFiles[0] && typeof selectedFiles[0] === "object") {
      imgSrc = URL.createObjectURL(selectedFiles[0]);
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl py-4 w-[300px]">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Image</h2>
        </div>
        <div className="text-center pt-0 px-4">
          <div className="bg-cover bg-center mb-3 rounded-lg flex items-center justify-center">
            <div
              className="h-36 w-36 bg-white shadow-2xl border border-solid border-slate-300 flex justify-center items-center relative cursor-pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {selectedFiles.length > 0 ? (
                <img src={imgSrc} className="h-full w-auto object-cover" />
              ) : (
                <FcAddImage className="text-7xl" />
              )}
            </div>

            {selectedFiles.length > 0 ? (
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-red hover:text-white cursor-pointer shadow-xl absolute translate-x-[70px] translate-y-[70px] bg-slate-300"
                onClick={() => handleRemoveImage(0)}
              >
                <CgClose />
              </button>
            ) : null}
          </div>
          <div className="text-xs text-slate-500 pt-10">
            Set the image. Only *.png, *.jpg and *.jpeg image files are accepted
          </div>
        </div>
      </div>
    </>
  );
};
