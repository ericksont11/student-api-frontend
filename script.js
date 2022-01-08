var studentURL = 'https://student-project-api.herokuapp.com/students';
var topicsURL = 'https://student-project-api.herokuapp.com/topics';
var instructorsURL = 'https://student-project-api.herokuapp.com/instructors';

var studentsButton = document.getElementById('students')
var topicsButton = document.getElementById('topics')
var instructorsButton = document.getElementById('instructors')
var container = document.getElementById('vertical-container')
        

function getStudents() {
    fetch(studentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        container.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            const div = document.createElement("div");
            div.classList.add("item");
            div.textContent = `${data[i].first_name} ${data[i].last_name}`
            div.setAttribute("data-index", i)
            div.addEventListener('click', getStudentInfo)
            container.appendChild(div)
        }
        return data
    });
}

function getTopics() {
    fetch(topicsURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        container.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            const div = document.createElement("div");
            div.classList.add("item");
            div.textContent = `${data[i].topic}`
            container.appendChild(div)
        }
        return data
    });
}

function getInstructors() {
    fetch(instructorsURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        container.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            const div = document.createElement("div");
            div.classList.add("item");
            div.textContent = `${data[i].first_name} ${data[i].last_name}`
            container.appendChild(div)
        }
        return data
    });
}

function getStudentInfo(e) {
    var studentIndex = e.target.getAttribute("data-index")
    fetch(studentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (studentData) {
        container.innerHTML = ""
        const div = document.createElement("div");
        div.classList.add("item");
        div.style.backgroundColor = 'blue'
        div.textContent = `${studentData[studentIndex].first_name} ${studentData[studentIndex].last_name}`
        container.appendChild(div)

        fetch(instructorsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === studentData[studentIndex].instructor){
                    const div = document.createElement("div");
                    div.classList.add("item");
                    div.textContent = `Instructor: ${data[i].first_name} ${data[i].last_name}`
                    container.appendChild(div)
                }
            }
        });

        fetch(topicsURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === studentData[studentIndex].favorite_topic){
                    const div = document.createElement("div");
                    div.classList.add("item");
                    div.textContent = `Favorite Subject: ${data[i].topic}`
                    container.appendChild(div)
                }
            }
        });
    });
}

studentsButton.addEventListener('click', getStudents)
topicsButton.addEventListener('click', getTopics)
instructorsButton.addEventListener('click', getInstructors)