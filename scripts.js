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


//Переміщення між вікнами
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


// Виводимо дані з localStorage на сторінку 
window.addEventListener('DOMContentLoaded', () => {
    showLocalStorage();
  });
  


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
  
    if (galleryImages.length === 0) {
      alert('Немає зображень для завантаження!');
      return;
    }
  
    let storedImages = JSON.parse(localStorage.getItem('images')) || [];
  
    // Переносимо кожне зображення в localStorage
    while (galleryImages.length > 0) {
      const img = galleryImages[0];
      storedImages.push(img.src);
      img.remove();
    }
  
    // Оновлюємо localStorage
    localStorage.setItem('images', JSON.stringify(storedImages));
  
    // Показуємо оновлений localStorage
    showLocalStorage();
  });


  function showLocalStorage() {
    const lsPhotoes = document.getElementById('ls_photoes');
    lsPhotoes.innerHTML = '';
  
    const storedImages = JSON.parse(localStorage.getItem('images')) || [];
  
    storedImages.forEach((url, index) => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Image ${index + 1}`;
      img.style.maxWidth = "200px";
      img.style.margin = "5px";
      lsPhotoes.appendChild(img);
    });
}




