document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    
    const memeTextInput = document.getElementById('memeText');
    const userWalletInput = document.getElementById('userWallet');
    const btnShare = document.getElementById('btnShare');

    // Create an elegant hidden download link element
    const downloadLink = document.createElement('a');

    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = '1001732203.jpg';

    baseImg.onload = () => {
        // Match canvas internal resolution to the real picture for crisp downloads
        canvas.width = baseImg.naturalWidth || 600;
        canvas.height = baseImg.naturalHeight || 600;
        renderMeme();
    };

    function renderMeme() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
        
        const textValue = memeTextInput.value.trim() || "CONVICTION IS RISING";
        
        // Dynamically scale font size based on canvas width for efficiency
        const fontSize = Math.floor(canvas.width * 0.065); 
        ctx.fillStyle = '#ffffff'; 
        ctx.font = `900 ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        ctx.strokeStyle = '#00ffa3';
        ctx.lineWidth = Math.floor(fontSize * 0.15);
        ctx.lineJoin = 'round';
        
        // Top placement optimization
        const paddingTop = canvas.height * 0.08;
        const xPosition = canvas.width / 2;
        const yPosition = paddingTop;

        ctx.strokeText(textValue.toUpperCase(), xPosition, yPosition);
        ctx.fillText(textValue.toUpperCase(), xPosition, yPosition);
    }

    function processAndDownload() {
        const walletAddress = userWalletInput.value.trim();
        const customCaption = memeTextInput.value.trim() || "Building tools for the herd.";

        if (!walletAddress) {
            alert("⚠️ Please drop your Solana wallet address first to lock in your submission point parameters.");
            return;
        }

        // 1. Force a clean final render
        renderMeme();

        // 2. Efficiently trigger a direct native download of the literal image file
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadLink.download = `ansem-bull-meme.jpg`;
        downloadLink.href = dataUrl;
        downloadLink.click();

        // 3. Open X Intent pre-formatted so they can instantly attach their downloaded image
        const tweetText = `⚡ Just forged raw alpha inside the $ANSEM Meme Factory!\n\n` +
                          `"${customCaption}"\n\n` +
                          `Tracking verification parameters via @BullpenFi indices.\n` +
                          `Wallet: ${walletAddress}\n\n` +
                          `cc: @blknoiz06 🐂\n` +
                          `Create your image asset here: https://ansemmemefactory.vercel.app/`;

        const targetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        
        // Give the download a split second to initiate before opening the tab
        setTimeout(() => {
            window.open(targetIntentUrl, '_blank');
        }, 300);
    }

    btnShare.addEventListener('click', processAndDownload);
    memeTextInput.addEventListener('input', renderMeme);
});
