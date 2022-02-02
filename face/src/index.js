import React, {useState} from 'react';
import {storage} from './fbase'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const ReactFirebaseFileUpload=()=>{
  const [image, setimage]=useState(null);
  const [url, setUrl]=useState("");
  const [progress, setProgress]=useState[0];

  const handleChange=e=>{
    if(e.target.files[0]){
      setimage(e.target.files[0]);
    }
  };

  const handleUpload=()=>{
    const uploadTask=storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred/snapshot.totalBytes)*100
        );
        setProgress(progress);
      },
      error=>{
        console.log(error);
      },
      ()=>{
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url=>{
          setUrl(url);
        });
      }
    );
  };

  console.log("image: ", image);

  return(
    <div>
      <progress value={progress} max="100"/>
      <br/>
      <br/>
      <input type="file" onChange={handleChange}/>
      <button onClick={handleUpload}>Upload</button>
      <br/>
      {url}
      <br/>
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image"/>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  <ReactFirebaseFileUpload/>,
  document.getElementById('root'),
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();