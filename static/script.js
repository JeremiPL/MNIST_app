const loadBtn = document.getElementById('loadBtn');
const canvas = document.getElementById('imageCanvas');
const digitLabel = document.getElementById('digitLabel');
const ctx = canvas.getContext('2d');

loadBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/random-image');
        const data = await response.json();
        
        drawImage(data.image);
        digitLabel.textContent = `Digit: ${data.label}`;
    } catch (error) {
        console.error('Error loading image:', error);
    }
});

function drawImage(imageData) {
    const pixelSize = 10;
    const width = imageData.length;
    const height = imageData[0].length;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const value = imageData[i][j];
            const gray = Math.floor(value * 255);
            ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
            ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
    }
}
