import React, {useState} from 'react';
import {storages} from './fbase.js';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {render} from "react-dom"


const ReactFirebaseFileUpload=()=>{
  const [image, setimage]=useState(null);
  const [url, setUrl]=useState("");
  const [progress, setProgress]=useState(0);

  const handleChange=e=>{
    if(e.target.files[0]){
      setimage(e.target.files[0]);
    }
  };

  const handleUpload=()=>{
    console.log(image);
    const uploadTask=storages.ref(`images/${image.name}`).put(image);
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
        storages
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
      
      <img src={url|| "http://via.placeholder.com/100"} className="main" alt="firebase-image"/>
    </div>
  );
};

render(<ReactFirebaseFileUpload />, document.querySelector("#root"));
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  <ReactFirebaseFileUpload/>,
  document.getElementById('root'),
  document.getq("#root")
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();