var animModule = (function () {
    window.onload = init;
    var canvas, context, width, height;
    var ballRadius = 10;
    var ballColor = "blue";
    var ballPosition;
    var dx = 5;
    const numLines = 16; // Number of lines
    const backgroundColor = '#D3C0C0';
    const lineColor = 'black';
    const lineThickness = 2;
    function init() {
        canvas = document.getElementById('testCanvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        // Initial ball position
        ballPosition = { x: ballRadius, y: ballRadius + 5 };
        // Start the Animation
        window.requestAnimFrame(doAnimation);
    }
    function setSpeed(speed) {
        dx = Math.sign(dx) * +speed; // Ensure correct direction
    }
    function calculateSpacing() {
        return height / numLines;
    }
    function drawLines(spacing) {
        for (let i = 0; i < numLines; i++) {
            let y = spacing * (i + 1);
            if (i === numLines - 1) {
                y -= 3; // Adjust for the last line
            }
            context.beginPath();
            context.lineWidth = (i === numLines - 1) ? 1 : lineThickness;
            context.moveTo(i % 2 === 0 ? 0 : ballRadius * 2, y);
            context.lineTo(i % 2 === 0 ? width - ballRadius * 2 : width, y);
            context.strokeStyle = lineColor;
            context.stroke();
        }
    }
    function updateBallPosition(spacing) {
        ballPosition.x += dx;
        if (ballPosition.x + ballRadius > width || ballPosition.x - ballRadius < 0) {
            dx = -dx; // Reverse direction
            ballPosition.y += spacing; // Move to next line
            if (ballPosition.y >= height) {
                ballPosition.y = spacing - ballRadius; // Reset to the top
            }
        }
        // Ensure ball stays within bounds
        ballPosition.x = Math.max(ballRadius, Math.min(ballPosition.x, width - ballRadius));
    }
    function drawBall(spacing) {
        context.beginPath();
        context.arc(ballPosition.x, ballPosition.y, ballRadius, 0, Math.PI * 2);
        context.fillStyle = (Math.floor(ballPosition.y / spacing) % 2 === 0) ? "blue" : "red";
        context.fill();
        context.closePath();
    }
    function drawBallOnCanvas() {
        context.fillStyle = backgroundColor; // Background color
        context.fillRect(0, 0, width, height); // Clear canvas
        var spacing = calculateSpacing(); // Calculate the spacing between lines
        drawLines(spacing); // Draw lines
        updateBallPosition(spacing); // Update ball position
        drawBall(spacing); // Draw ball
    }
    // Browser specific animation request
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    function doAnimation() {
        drawBallOnCanvas();
        window.requestAnimFrame(doAnimation);
    }
    return {
        setSpeed: setSpeed
    };
})();