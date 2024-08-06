const mediaInput = document.getElementById('mediaInput');
const mediaBox = document.getElementById('mediaBox');

mediaInput.addEventListener('change', function() {
    const file = mediaInput.files[0];
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            mediaBox.innerHTML = `<img src="${e.target.result}" alt="Image" class="draggable">`;
            enableDragging();
            enableZooming();
        };
        reader.readAsDataURL(file);
    } else if (fileType.startsWith('video/')) {
        mediaBox.innerHTML = `<video src="${URL.createObjectURL(file)}" controls></video>`;
    } else {
        mediaBox.innerHTML = 'Invalid file type';
    }
});

function enableDragging() {
    const draggable = document.querySelector('.draggable');
    let offsetX = 0, offsetY = 0, startX = 0, startY = 0, isDragging = false;

    draggable.addEventListener('mousedown', (e) => {
        e.preventDefault();
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            draggable.style.left = `${newLeft}px`;
            draggable.style.top = `${newTop}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function enableZooming() {
    const draggable = document.querySelector('.draggable');
    let scale = 1;

    draggable.addEventListener('wheel', (e) => {
        e.preventDefault();

        const delta = Math.sign(e.deltaY);
        const zoomFactor = 0.1;

        if (delta < 0) {
            scale += zoomFactor;
        } else {
            scale -= zoomFactor;
        }

        scale = Math.max(0.1, scale); // Prevent zooming out too much

        draggable.style.transform = `scale(${scale})`;
    });
}
