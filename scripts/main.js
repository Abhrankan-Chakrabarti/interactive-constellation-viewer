document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('constellationCanvas');
    const ctx = canvas.getContext('2d');
    const stars = [];
    let isDrawing = false;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;

    canvas.addEventListener('click', function(event) {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;
        stars.push({ x, y });
        drawStar(x, y);
    });

    function drawStar(x, y) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    document.getElementById('saveBtn').addEventListener('click', function() {
        localStorage.setItem('constellation', JSON.stringify(stars));
        alert('Constellation saved!');
    });

    document.getElementById('loadBtn').addEventListener('click', function() {
        const savedStars = JSON.parse(localStorage.getItem('constellation'));
        if (savedStars) {
            stars.length = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            savedStars.forEach(star => {
                stars.push(star);
                drawStar(star.x, star.y);
            });
            alert('Constellation loaded!');
        } else {
            alert('No saved constellation found!');
        }
    });
});