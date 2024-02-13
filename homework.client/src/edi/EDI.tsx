import React, { useState } from "react";

const EDI: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [paths, setPaths] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/EDI/processcsvfile", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setUploadStatus("Files processed successfully");
        const data = await response.json();
        setPaths(data.filePaths);
      } else {
        setUploadError("Error processing files");
      }
    } catch (error) {
      console.error("Error processing files:", error);
      setUploadError("Error processing files");
    }
  };

  //   const handleDownload = (path: string) => {
  //     fetch(path)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.blob();
  //       })
  //       .then((blob) => {
  //         const url = window.URL.createObjectURL(new Blob([blob]));
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = path.substring(path.lastIndexOf("/") + 1); // Extracting filename from the path
  //         console.debug(a.download);
  //         console.debug(a.href);
  //         console.debug(a);
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //       })
  //       .catch((error) => {
  //         console.error("Error downloading file:", error);
  //       });
  //   };

  return (
    <main className="container">
      <h1>CSV Splitter</h1>
      <h2>Upload CSV File</h2>

      <div className="input-group mb-3">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="form-control"
          placeholder="Click here to upload file"
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </div>

      <div className="mt-4" role="status">
        {uploadStatus && (
          <div className="alert alert-success">{uploadStatus}</div>
        )}
        {uploadError && <div className="alert alert-danger">{uploadError}</div>}
      </div>

      <ul className="list-group">
        {paths.map((path, index) => (
          <li className="list-group-item" key={index}>
            {/* fix this in the cs file */}
            <a className="btn btn-primary w-100" href={`/${path}`} download>
              Download {path}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default EDI;
