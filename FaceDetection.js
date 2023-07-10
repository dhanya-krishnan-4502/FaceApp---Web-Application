import React, { useState } from 'react';

const FaceDetection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageReceived, setIsImageReceived] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { imageUrl } = data;
        setImageUrl(imageUrl);
        setIsImageReceived(true);
      } else {
        console.log('Error uploading image');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Face Detection</h2>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="User's image"
          style={{ maxWidth: '300px', marginBottom: '10px' }}
        />
      )}
      {isImageReceived && <p>Image received from the server!</p>}
      <br />
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default FaceDetection;
