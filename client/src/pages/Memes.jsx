import React, { useState, useEffect, useRef } from 'react';
import '../styles/memestyles.css';

const Memes = () => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  const [randomImg, setRandomImg] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(content => setAllMemeImgs(content.data.memes));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'topText') {
      setTopText(value);
    } else if (name === 'bottomText') {
      setBottomText(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rand = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    setRandomImg(rand);
    setUploadedImage(null); // Clear uploaded image if any
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setRandomImg(null); // Clear random image if any
      };
      reader.readAsDataURL(file);
    }
  };

  const drawMeme = () => {
    const imgUrl = uploadedImage || randomImg;
    if (imgUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font = '40px Impact';
        ctx.lineWidth = 2;
        ctx.fillText(topText, canvas.width / 2, 50);
        ctx.strokeText(topText, canvas.width / 2, 50);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
      };
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'meme.png';
    link.click();
  };

  useEffect(() => {
    drawMeme();
  }, [randomImg, topText, bottomText, uploadedImage]);

  return (
    <div className="meme-container">
      
      <div className="meme-form-container">
      <h2>Enter Text</h2>
        <form className='meme-form' onSubmit={handleSubmit}>
          <input
            placeholder='Enter Top Text'
            type='text'
            value={topText}
            name='topText'
            onChange={handleChange}
          />
          <input
            placeholder='Enter Bottom Text'
            type='text'
            value={bottomText}
            name='bottomText'
            onChange={handleChange}
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='file-input'
          />
          <button className='btn' type='submit'>Generate</button>
        </form>
      </div>
      <div className="meme-display">
        {(!randomImg && !uploadedImage) ? (
          <div className="blank-container">
            <p>Upload an image or generate a meme to see it here.</p>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} className="meme-canvas" />
            {randomImg || uploadedImage ? <button className="download-btn" onClick={downloadMeme}>Download</button> : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Memes;

// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/memestyles.css';

// const Memes = () => {
//   const [topText, setTopText] = useState('');
//   const [bottomText, setBottomText] = useState('');
//   const [allMemeImgs, setAllMemeImgs] = useState([]);
//   const [randomImg, setRandomImg] = useState('');
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     fetch('https://api.imgflip.com/get_memes')
//       .then(response => response.json())
//       .then(content => setAllMemeImgs(content.data.memes));
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'topText') {
//       setTopText(value);
//     } else if (name === 'bottomText') {
//       setBottomText(value);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const rand = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
//     setRandomImg(rand);
//   };

//   const drawMeme = () => {
//     if (randomImg && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.src = randomImg;
//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);
//         ctx.fillStyle = 'white';
//         ctx.strokeStyle = 'black';
//         ctx.textAlign = 'center';
//         ctx.font = '40px Impact';
//         ctx.lineWidth = 2;
//         ctx.fillText(topText, canvas.width / 2, 50);
//         ctx.strokeText(topText, canvas.width / 2, 50);
//         ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
//         ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
//       };
//     }
//   };

//   const downloadMeme = () => {
//     const canvas = canvasRef.current;
//     const link = document.createElement('a');
//     link.href = canvas.toDataURL('image/png');
//     link.download = 'meme.png';
//     link.click();
//   };

//   useEffect(() => {
//     drawMeme();
//   }, [randomImg, topText, bottomText]);

//   return (
//     <div className="meme-container">
//       <div className="meme-content">
//         <div className="meme-form-container">
//           <form className='meme-form' onSubmit={handleSubmit}>
//             <input
//               placeholder='Enter Top Text'
//               type='text'
//               value={topText}
//               name='topText'
//               onChange={handleChange}
//             />
//             <input
//               placeholder='Enter Bottom Text'
//               type='text'
//               value={bottomText}
//               name='bottomText'
//               onChange={handleChange}
//             />
//             <button className='btn' type='submit'>Generate</button>
//           </form>
//         </div>
//         <div className="meme-display">
//           <canvas ref={canvasRef} className="meme-canvas" style={{ display: randomImg ? 'block' : 'none' }} />
//           {randomImg && <button className="download-btn" onClick={downloadMeme}>Download</button>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Memes;
