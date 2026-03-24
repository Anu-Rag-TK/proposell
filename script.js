document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const content = document.getElementById('content');
    const successContent = document.getElementById('success-content');
    const cryingContent = document.getElementById('crying-content');
    const heartsContainer = document.getElementById('hearts-container');

    const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1484624481212170461/6Y8HD_P7wlJzM6tH6O9iyV2nwhRTw3HhkcMO22lgpXjaKcfwk_gAJ8FOuXZJQXLxVLo7';

    const sendDiscordNotification = (message) => {
        if (DISCORD_WEBHOOK_URL === 'https://discordapp.com/api/webhooks/1484624481212170461/6Y8HD_P7wlJzM6tH6O9iyV2nwhRTw3HhkcMO22lgpXjaKcfwk_gAJ8FOuXZJQXLxVLo7' || !DISCORD_WEBHOOK_URL) return;
        
        fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message })
        }).catch(err => console.error('Discord webhook failed:', err));
    };

    // Create background floating hearts
    const createFloatingHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = ['❤️', '💖', '💕', '💓', '💗'][Math.floor(Math.random() * 5)];
        
        const size = Math.random() * 1.5 + 0.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 4;
        const delay = Math.random() * 5;
        
        heart.style.fontSize = `${size}rem`;
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    };

    for (let i = 0; i < 20; i++) {
        setTimeout(createFloatingHeart, Math.random() * 3000);
    }
    
    setInterval(createFloatingHeart, 800);

    const noTexts = ["Are you sure?", "Think again!", "Really?", "Are you absolutely sure?", "Please?"];
    let hoverCount = 0;
    
    noBtn.addEventListener('mouseenter', () => {
        hoverCount++;
        if(hoverCount > 0) {
            noBtn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
        }
    });

    noBtn.addEventListener('click', () => {
        content.classList.add('hidden');
        cryingContent.classList.remove('hidden');
        sendDiscordNotification("💔 Oh no! She clicked NO! 😢");
    });

    // Yes Button Success Logic
    yesBtn.addEventListener('click', () => {
        content.classList.add('hidden');
        successContent.classList.remove('hidden');
        createHeartExplosion();
        sendDiscordNotification("🎉🎉 YES!!! She clicked YES! 🎉🎉");
    });

    const createHeartExplosion = () => {
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = ['❤️', '💖', '🎉', '✨'][Math.floor(Math.random() * 4)];
                heart.style.position = 'fixed';
                
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '100';
                
                const tx = (Math.random() - 0.5) * window.innerWidth;
                const ty = (Math.random() - 0.5) * window.innerHeight;
                const rot = Math.random() * 360;
                
                heart.style.transition = `all ${Math.random() * 1.5 + 0.8}s cubic-bezier(0.1, 0.8, 0.3, 1)`;
                heart.style.transform = `translate(-50%, -50%) scale(0)`;
                
                document.body.appendChild(heart);
                
                requestAnimationFrame(() => {
                    heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1) rotate(${rot}deg)`;
                    heart.style.opacity = '0';
                });
                
                setTimeout(() => {
                    heart.remove();
                }, 2500);
            }, i * 20);
        }
    };
});
