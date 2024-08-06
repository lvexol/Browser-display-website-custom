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
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    draggable.addEventListener('mousedown', (e) => {
        e.preventDefault();
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const parentRect = draggable.parentElement.getBoundingClientRect();
        const imgRect = draggable.getBoundingClientRect();

        let newLeft = mouseX - offsetX;
        let newTop = mouseY - offsetY;

        draggable.style.left = `${newLeft}px`;
        draggable.style.top = `${newTop}px`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}
