function scrollToDiv() {
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        const element = document.getElementById('main_info');
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    } else {
        window.location.href = "index.html?scroll=true";
    }
}


window.onload = function () {
    if (window.location.search.includes("scroll=true")) {
        const element = document.getElementById('main_info');
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
            }, 500); 
        }
    }

    document.getElementById("lessons")?.addEventListener("click", function () {
        window.location.href = "lessons.html";
    });

    document.getElementById("lessons2")?.addEventListener("click", function () {
        window.location.href = "lessons.html";
    });

    document.getElementById("about_us")?.addEventListener("click", scrollToDiv);

    document.getElementById("newbie")?.addEventListener("click", function () {
        window.location.href = "lesson_pages/newbie/newbie_page.html";
    });

    document.getElementById("portrait")?.addEventListener("click", function () {
        window.location.href = "lesson_pages/portrait/portrait.html";
    });

    document.getElementById("landscape")?.addEventListener("click", function () {
        window.location.href = "lesson_pages/landscape/landscape.html";
    });

    document.getElementById("still")?.addEventListener("click", function () {
        window.location.href = "lesson_pages/still_photo/still_photo.html";
    });
    


    document.getElementById("gallery")?.addEventListener("click", function () {
        window.location.href = "gallery.html";
    });

    document.getElementById("progress")?.addEventListener("click", function () {
        window.location.href = "progress.html";
    });

};


// Додавання фото на екран без збереження в localStorage
document.getElementById('addImageInput').addEventListener('change', function (event) {
    const files = event.target.files;
    const imageGallery = document.getElementById('imageGallery');
  
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.alt = `Image ${i + 1}`;
          imgElement.style.maxWidth = "200px";
          imgElement.style.margin = "5px";
          imageGallery.appendChild(imgElement);
        };
  
        reader.readAsDataURL(file);
    }
}
});
  
  
document.getElementById('uploadBtn').addEventListener('click', function () {
    const imageGallery = document.getElementById('imageGallery');
    const galleryImages = imageGallery.getElementsByTagName('img');
    const imgType = document.getElementById('imageType').value;

    if (galleryImages.length === 0) {
        alert('Немає зображень для завантаження!');
        return;
    }

    let storedImages = JSON.parse(localStorage.getItem('images')) || [];

    const init_size = galleryImages.length;
    
    while (galleryImages.length > 0) {
        const img = galleryImages[0];

        const canvas = document.createElement('canvas');
        const scale = 0.5; 
        canvas.width = img.naturalWidth * scale;
        canvas.height = img.naturalHeight * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedDataURL = canvas.toDataURL('image/jpeg', 0.8); 

        storedImages.push({
            src: resizedDataURL,
            type: imgType,
            width: canvas.width,
            height: canvas.height
        });

        img.remove();
    }

    localStorage.setItem('images', JSON.stringify(storedImages));

    const uploadMsg = document.getElementById('uploadMsg');
    uploadMsg.innerHTML = ''; 

    const labelContent = document.createElement('span');
    labelContent.className = "px-6 py-2 bg-green-100 text-green-800 rounded-lg shadow text-center";
    labelContent.textContent = init_size > 1 
        ? `Тип доданих вами фотографій: ${imgType}` 
        : `Тип доданої вами фотографії: ${imgType}`;

    uploadMsg.appendChild(labelContent);

});

function showLocalStorage() {
    const lsPhotoes = document.getElementById('filtered_photos');
    lsPhotoes.innerHTML = '';

    const storedImages = JSON.parse(localStorage.getItem('images')) || [];
    const groupedImages = {};
    const selectedType = document.getElementById('filterType').value;

    if (storedImages.length === 0) {
        return 0;
    }

    let i = 0;
    while (i < storedImages.length) {
        const imageData = storedImages[i];
        if (imageData && imageData.src && imageData.type) {
            if (selectedType === 'all' || imageData.type === selectedType) {
                if (!groupedImages[imageData.type]) {
                    groupedImages[imageData.type] = [];
                }
                groupedImages[imageData.type].push(imageData.src);
            }
        } else {
            console.error('Помилка із завантаженими фотографіями:', imageData);
        }
        i++;
    }

    document.getElementById('filtered_photos').className = "w-5/6 flex flex-wrap justify-center gap-4 mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200 mx-auto";

    const types = Object.keys(groupedImages);
    if (types.length === 0) {
        const noImagesMsg = document.createElement('div');
        noImagesMsg.className = 'text-center text-gray-600 text-xl mt-8';
        noImagesMsg.textContent = 'Немає фотографій обраного типу';
        lsPhotoes.appendChild(noImagesMsg);
        return;
    }

    let j = 0;
    while (j < types.length) {
        const type = types[j];
        const typeBlock = document.createElement('div');
        typeBlock.className = 'w-full max-w-7xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-xl border border-gray-200';

        const typeTitle = document.createElement('h2');
        typeTitle.textContent = type;
        typeTitle.className = 'text-4xl font-extrabold text-center text-blue-700 mb-8 decoration-blue-400';
        typeBlock.appendChild(typeTitle);

        const typeContainer = document.createElement('div');
        typeContainer.className = 'flex flex-wrap justify-center gap-6';

        let k = 0;
        const typeImages = groupedImages[type];
        while (k < typeImages.length) {
            const src = typeImages[k];

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'inline-flex justify-center items-center transform scale-75 origin-top rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300';

            const img = document.createElement('img');
            img.src = src;
            img.alt = type;
            img.className = 'h-auto w-auto max-w-none rounded-lg shadow-md';

            imgWrapper.appendChild(img);
            typeContainer.appendChild(imgWrapper);

            k++;
        }

        typeBlock.appendChild(typeContainer);
        lsPhotoes.appendChild(typeBlock);
        j++;
    }
}


document.getElementById('delete-photos').addEventListener('click', function() {
    if (localStorage.length === 0) {return}
    localStorage.clear();
    console.log(window.location);
    document.getElementById("filtered_photos").className = "flex flex-wrap justify-center gap-4 mt-6"
    window.location.reload();
})
