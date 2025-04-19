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


document.getElementById('imageUpload').addEventListener('change', function(event) {
    const files = event.target.files;  
    const imageGallery = document.getElementById('imageGallery');  

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {

                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.alt = `Image ${i + 1}`;
                imgElement.style.maxWidth = "200px";  
                imgElement.style.height = "auto";  
                imgElement.style.marginBottom = "10px";  

                imageGallery.appendChild(imgElement);
            };

            reader.readAsDataURL(file);  
        }
    }
});



// function markCourseVisited(course) {
//     let visitedCourses = JSON.parse(localStorage.getItem("visitedCourses")) || [];
//     if (!visitedCourses.includes(course)) {
//         visitedCourses.push(course);
//         localStorage.setItem("visitedCourses", JSON.stringify(visitedCourses));
//     }
// }


// function checkCourseProgress() {
//     let visitedCourses = JSON.parse(localStorage.getItem("visitedCourses")) || [];

//     if (visitedCourses.length > 0) {
//         showCompletionMessage();
//     }
// }


// function showCompletionMessage() {
//     if (!document.getElementById("completionMessage")) {
//         const completionDiv = document.createElement("div");
//         completionDiv.id = "completionMessage";
//         completionDiv.innerText = "Congratulations! You have started your learning journey.";
//         completionDiv.style.padding = "20px";
//         completionDiv.style.backgroundColor = "#4CAF50";
//         completionDiv.style.color = "white";
//         completionDiv.style.textAlign = "center";
//         completionDiv.style.marginTop = "20px";
//         completionDiv.style.fontSize = "18px";
//         completionDiv.style.borderRadius = "10px";

//         document.body.appendChild(completionDiv);
//     }
// }


