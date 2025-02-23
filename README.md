# FaceApp - Facial Recognition Web Application

FaceApp is a web-based facial recognition and expression detection application that leverages **face-api.js** and **Express.js** to detect, recognize, and analyze facial expressions. The project includes both a **React.js frontend** and an **Express.js backend** to process and display results.

## Features
- **Face Detection**: Detects human faces in an uploaded image.
- **Face Recognition**: Matches detected faces against a database of known faces.
- **Facial Expression Analysis**: Identifies expressions like happiness, sadness, surprise, etc.
- **Face Similarity**: Compares two uploaded images and calculates their similarity score.

## Project Structure
The project consists of both frontend and backend components.

### 📂 Directory Structure
```
FaceApp
│── client/           # React Frontend
│   ├── src/          # React components and logic
│   ├── public/       # Static files (index.html, favicon, etc.)
│   ├── package.json  # Frontend dependencies
│   ├── .gitignore    # Ignoring unnecessary files
│   ├── README.md     # Documentation
│── server/           # Express.js Backend
│   ├── models/       # Pretrained FaceAPI models
│   ├── uploads/      # Temporary uploaded images
│   ├── known_faces/  # Stored known face images
│   ├── faceRecognition.js # Face recognition logic
│   ├── server.js     # Main backend server
│   ├── package.json  # Backend dependencies
│   ├── .gitignore    # Ignoring unnecessary files
│── .gitattributes    # Git LFS tracking for large files
│── .gitignore        # Files ignored in version control
│── README.md         # Project documentation
```

## 🛠 Setup Instructions
To run the application locally, follow these steps:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/dhanya-krishnan-4502/FaceApp---Web-Application.git
cd FaceApp
```

### 2️⃣ Install Dependencies
#### Install Backend (Express.js)
```sh
cd server
npm install
```

#### Install Frontend (React.js)
```sh
cd ../client
npm install
```

### 3️⃣ Set Up FaceAPI Models
Ensure that the `models/` directory contains the required FaceAPI models. If not, download them from the FaceAPI repository and place them inside `server/models/`.

### 4️⃣ Fix Node.js Version Compatibility Issues
If you encounter an error related to `canvas` or module version mismatches, follow these steps:

#### Check Node.js Version
```sh
node -v
```
Compare it with the required **NODE_MODULE_VERSION** in the error message. If your version is mismatched, downgrade using `nvm`.

#### Install an Older Node.js Version with `nvm`
If `nvm` is not installed, install it first:
```sh
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc   # or source ~/.zshrc if using zsh
```

Check available Node.js versions:
```sh
nvm ls
```
If the required version isn't installed, install it:
```sh
nvm install 16   # Example: install Node.js v16
nvm use 16       # Switch to Node.js v16
```

#### Rebuild Dependencies
```sh
npm rebuild
npm install
```

#### Remove & Reinstall `canvas`
If the issue persists, reinstall `canvas`:
```sh
npm uninstall canvas
npm install canvas
```

### 5️⃣ Run the Server
```sh
cd server
node server.js
```
The backend server should now be running on `http://localhost:8000/`.

### 6️⃣ Start the React Frontend
```sh
cd ../client
npm start
```
The frontend should now be accessible at `http://localhost:3000/`.

## 🚀 How to Use
1. Open the web application in a browser.
2. Use the **Face Detection** feature to upload an image and detect faces.
3. Use **Face Recognition** to match detected faces against stored known faces.
4. Upload two images to **Face Similarity** to compare how similar the faces are.
5. Analyze **Facial Expressions** from the uploaded image.

## ❌ Troubleshooting
- If `node_modules` was accidentally added to Git, remove it using:
  ```sh
  git rm -r --cached node_modules/
  echo 'node_modules/' >> .gitignore
  git commit -m 'Removed node_modules'
  git push origin main
  ```
- If Git LFS isn't installed, install it via:
  ```sh
  git lfs install
  ```

## 🛠 Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Face Detection & Recognition**: FaceAPI.js
- **Database**: Local file-based image storage
- **Version Control**: Git & GitHub

## 🤝 Contributing
Feel free to fork this project and submit pull requests. Contributions are welcome!

## 📜 License
This project is open-source.

## 📧 Contact
For questions or suggestions, reach out to **dhanyakrishnan4502@gmail.com**.

