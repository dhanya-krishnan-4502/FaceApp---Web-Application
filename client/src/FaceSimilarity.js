import React, { useState } from 'react';
import './FaceDetection.css';

const FaceSimilarity = () => {
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [distance, setDistance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagesCompared, setImagesCompared] = useState(false); 
  const [similarityMessage, setSimilarityMessage] = useState('');

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setImageFile1(file);
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setImageFile2(file);
  };

  const handleSimilaritySubmit = async () => {
    if (imageFile1 && imageFile2) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image1', imageFile1);
        formData.append('image2', imageFile2);

        const response = await fetch('http://localhost:8000/face-similarity', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setDistance(data.distance);

          if (data.distance >= 0.0 && data.distance <= 0.3) {
            setSimilarityMessage('The two images are of the same person.');
          } else if (data.distance > 0.3 && data.distance <= 0.5) {
            setSimilarityMessage('The two images are likely to be the same person.');
          } else if (data.distance > 0.5 && data.distance <= 0.7) {
            setSimilarityMessage('The two images are not likely to be the same person.');
          } else {
            setSimilarityMessage('The two images are not of the same person.');
          }
        } else {
          console.log('Error processing images. Status:', response.status);
          const errorData = await response.json();
          console.log('Error message:', errorData.message);
        }
      } catch (error) {
        console.log('Error processing images:', error);
      } finally {
        setIsLoading(false);
        setImagesCompared(true); 
      }
    } else {
      console.log('Please select both images before submitting.');
    }
  };

  return (
    <div className="FaceDetection">
      <h2>Face Similarity</h2>
      {isLoading && (
        <>
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
      )}
      {imagesCompared && distance !== '' && (
        <div className="image-container">
          <div className="image-wrapper">
            {imageFile1 && <img src={URL.createObjectURL(imageFile1)} alt="Detected face 1" className="face-image" />}
          </div>
          <div className="image-wrapper">
            {imageFile2 && <img src={URL.createObjectURL(imageFile2)} alt="Detected face 2" className="face-image" />}
          </div>
        </div>
      )}
      {imagesCompared && distance !== '' && <h2>Similarity Distance: {distance}</h2>}
      {imagesCompared && distance === '' && <h2>No similarity distance found.</h2>}
      {imagesCompared && similarityMessage && <h2>{similarityMessage}</h2>}
      {!isLoading && !imagesCompared && (
        <div className="image-container">
          <div className="image-wrapper">
            {imageFile1 && <img src={URL.createObjectURL(imageFile1)} alt="Detected face 1" className="face-image" />}
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange1} />
          </div>
          <div className="image-wrapper">
            {imageFile2 && <img src={URL.createObjectURL(imageFile2)} alt="Detected face 2" className="face-image" />}
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange2} />
          </div>
          <div className="compare-button">
            <button onClick={handleSimilaritySubmit} disabled={isLoading}>
              Compare Images
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default FaceSimilarity;
