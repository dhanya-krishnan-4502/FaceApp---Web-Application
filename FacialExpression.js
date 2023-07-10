import React, { useState } from 'react';

const FaceDetection = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  return (
    <div>
      <h2>Facial Expression</h2>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="User's image"
          style={{ maxWidth: '300px', marginBottom: '10px' }}
        />
      )}
      <br></br>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default FaceDetection;
