const convertButton = document.querySelector('.convert')
const fileInput = document.querySelector('input[type=file]')
const mainImage = document.querySelector('section img')
const span = document.querySelector('.image-wrapper span')
const downloadImageButton = document.querySelector('.download')

const modal = document.querySelector('.modal')
const closeModalButton = document.querySelector('.close-modal')

const canvas = document.querySelector('#canvas')

let file;

// Métodos

convertButton.onclick = () => fileInput.click();
downloadImageButton.onclick = () => showConversionOptions();
closeModalButton.onclick = () => closeModal();

let ctx = canvas.getContext('2d')

fileInput.addEventListener('change', () => {
    // Chave 'this' refere-se ao elemento que recebe o event listener (fileInput)
    file = getFileState()

    if (file) {
        span.style.display = 'none'
        mainImage.style.display = 'initial'
        downloadImageButton.classList.remove('hide')
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const reader = new FileReader();

        reader.onload = () => {
            mainImage.src = reader.result
        };

        reader.readAsDataURL(file)

    } else {
        span.style.display = 'flex'
        mainImage.style.display = 'none'
        downloadImageButton.classList.add('hide')
    }

})


function showConversionOptions() {
    modal.style.display = 'flex';
    handleRenderFileOptions();
}


function handleRenderFileOptions() {
    file = getFileState()

    modal.querySelector('.file-type')
    .innerHTML = file.type

    const modalUl = document.querySelector('.modal ul')
    modalUl.innerHTML = '';

    const fileTypes = ['JPEG', 'PNG', 'JPG']

    fileTypes.map(type => {
        let li = document.createElement('li')
        li.textContent = type
        li.addEventListener('click', downloadImage)

        modalUl.appendChild(li)
    })
}


function downloadImage({target}) {
    file = getFileState()
    let chosenExtension = target.textContent

    canvas.width = mainImage.naturalWidth;
    canvas.height = mainImage.naturalHeight;

    ctx.drawImage(mainImage, 0, 0)

    const url = canvas.toDataURL(`image/${chosenExtension.toLowerCase()}`)

    let a = document.createElement('a');
    a.download = `${file.name}-converted`;
    a.href = url;
    a.click();
}

const closeModal = () => modal.style.display = 'none';

const getFileState = () => fileInput.files[0];