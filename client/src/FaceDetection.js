import React, { useState } from 'react';
import './FaceDetection.css';

const FaceDetection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageReceived, setIsImageReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true); 
      const response = await fetch('http://localhost:8000/face-detection', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { imageUrl } = data;
        console.log('Image received successfully:', imageUrl);
        setImageUrl(imageUrl);
        setIsImageReceived(true);
      } else {
        console.log('Error uploading image. Status:', response.status);
        const errorData = await response.json();
        console.log('Error message:', errorData.message);
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="FaceDetection">
      <h2>Face Detection</h2>
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
              alt="User's image"
              style={{ maxWidth: '500px', marginBottom: '10px' }}
            />
          )}
          {isImageReceived }
          <br />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </>
      )}
      
    </div>
  );
};

export default FaceDetection;
