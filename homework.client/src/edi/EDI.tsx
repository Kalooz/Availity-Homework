import React, { useState } from "react";

const EDI: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [paths, setPaths] = useState([]);


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
                setUploadStatus("Error processing files");
            }
        } catch (error) {
            console.error("Error processing files:", error);
            setUploadStatus("Error processing files");
        }
    };

    const handleDownload = (path: string) => {
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = path.substring(path.lastIndexOf('/') + 1); // Extracting filename from the path
                console.debug(a.download)
                console.debug(a.href)
                console.debug(a)
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    return (
        <div>
            <h2>Upload CSV File</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
            <ul>
                {paths.map((path, index) => (
                    <li key={index}>
                        <a href="/insurances/123 Insurance_Enrollees.csv" download="InsuranceCompany_Enrollees.csv">test</a>
                    </li>
                ))}
            </ul>
    </div>
  );
};

export default EDI;
