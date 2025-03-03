const jsonString = `[
    { "name": "Ahmet", "class": "10A", "gpa": 85 },
    { "name": "Zeynep", "class": "11B", "gpa": 90 },
    { "name": "Mehmet", "class": "12C", "gpa": 78 }
]`;

const studentData = JSON.parse(jsonString);

document.addEventListener("DOMContentLoaded", function() {
    renderTable();
});

function renderTable() {
    let tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";
    
    studentData.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.gpa}</td>
            <td><button class="delete-btn" data-index="${index}">Sil</button></td>
        `;
        
        row.addEventListener("click", function() {
            $(this).toggleClass("highlight");
        });
        
        tableBody.appendChild(row);
    });
    
    $(".delete-btn").off("click").on("click", function(event) {
        event.stopPropagation();
        let index = $(this).data("index");
        deleteStudent(index);
    });
}

function deleteStudent(index) {
    studentData.splice(index, 1);
    renderTable();
}

document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let gpa = parseInt(document.getElementById("gpa").value);
    
    if (isNaN(gpa) || gpa < 0 || gpa > 100) {
        alert("Not ortalaması 0 ile 100 arasında olmalıdır!");
        return;
    }
    
    studentData.push({ name, class: studentClass, gpa });
    renderTable();
    this.reset();
});