document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    
    const memeTextInput = document.getElementById('memeText');
    const userWalletInput = document.getElementById('userWallet');
    const btnPreview = document.getElementById('btnPreview');
    const btnShare = document.getElementById('btnShare');

    // Load template background asset
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    // Swap out this placeholder URL with an iconic Ansem banner or Bull silhouette asset
    baseImg.src = 'HMacMQCXcAAg5Aa.jpg';

    baseImg.onload = () => {
        renderMeme();
    };

    function renderMeme() {
        // Clear canvas context
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Render base graphic layer
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
        
        // Gather state configuration
        const textValue = memeTextInput.value.trim() || "CONVICTION IS RISING";
        
        // Configure classic web3 meme typography layout
        ctx.fillStyle = '#00ffa3'; 
        ctx.font = '900 42px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        
        // Structural outline shadow styling for clarity over images
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 8;
        ctx.lineJoin = 'round';
        
        const paddingBottom = 60;
        const xPosition = canvas.width / 2;
        const yPosition = canvas.height - paddingBottom;

        // Draw structural outline stroke text layer
        ctx.strokeText(textValue.toUpperCase(), xPosition, yPosition);
        // Draw fill text layer
        ctx.fillText(textValue.toUpperCase(), xPosition, yPosition);
    }

    function executeXShare() {
        const walletAddress = userWalletInput.value.trim();
        const customCaption = memeTextInput.value.trim() || "Building tools for the herd.";

        if (!walletAddress) {
            alert("⚠️ Please insert your Solana wallet address first to be included in the distribution validation loop.");
            return;
        }

        // Auto-constructed payload matching the dynamic multi-layered scoring meta
        const tweetText = `⚡ Just minted custom alpha inside the $ANSEM Meme Factory!\n\n` +
                          `"${customCaption}"\n\n` +
                          `Tracking validation parameters via @BullpenFi indices.\n` +
                          `Wallet: ${walletAddress}\n\n` +
                          `cc: @blknoiz06 🐂 \n` +
                          `Forge your own media here: [YOUR_DEPLOYED_URL]`;

        const targetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(targetIntentUrl, '_blank');
    }

    // Dynamic UI Listeners
    btnPreview.addEventListener('click', renderMeme);
    btnShare.addEventListener('click', executeXShare);
    
    // Rerender on typing for dynamic input responsiveness
    memeTextInput.addEventListener('input', renderMeme);
});

