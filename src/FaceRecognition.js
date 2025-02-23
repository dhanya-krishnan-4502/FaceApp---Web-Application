import React, { useState } from 'react';
import './FaceDetection.css';

const FaceRecognition = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:8000/face-recognition', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error recognizing face.');
      }

      const data = await response.json();
      console.log('Recognition result:', data);

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }

      setResult(data.name === 'unknown' ? 'No known faces detected' : `Recognized as: ${data.name}`);

    } catch (error) {
      console.error('❌ Face recognition error:', error.message);
      setResult('Error recognizing face.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="FaceDetection">
      <h2>Face Recognition</h2>
      {isLoading ? ( 
         <>
         <br />
         <br />
         <br />
         <div className="loader-wrapper">
           <div className="loader">
             <div className="bar1"></div>
             <div className="bar2"></div>
             <div className="bar3"></div>
             <div className="bar4"></div>
             <div className="bar5"></div>
             <div className="bar6"></div>
           </div>
         </div>
         <br />
        </>
      ) : (
        <>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Recognized face"
              style={{ maxWidth: '300px', marginBottom: '10px', borderRadius: '10px' }}
            />
          )}
          <p>{result}</p>
          <br />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </>
      )}
    </div>
  );
};

export default FaceRecognition;
