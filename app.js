if (document.getElementById("card") != null) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  let name = localStorage.getItem("name")
  localStorage.setItem("name", "")
  fetch(`http://localhost:8080/student/${name}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("id").innerHTML = `Student ID : ${data.id}`;
      document.getElementById("fname").innerHTML = `First Name : ${data.fname}`;
      document.getElementById("lname").innerHTML = `Last Name : ${data.lname}`;
      document.getElementById("address").innerHTML = `Address : ${data.address}`;
      document.getElementById("age").innerHTML = `Age : ${data.age}`;
      document.getElementById("genderr").innerHTML = `Gender : ${data.gender}`;
      document.getElementById("grade").innerHTML = `Grade : ${data.grade}`;
      document.getElementById("phone").innerHTML = `Phone : ${data.phone}`;
      document.getElementById("image").src = `data:image/*;base64,${data.photo}`
    })
}

if (document.getElementById("table") != null) {
  load();
}

if (document.getElementById("image") != null) {
  let image = document.getElementById("image");

  image.addEventListener("change", e => {
    if (image.files[0].size >= 1000000) {
      window.alert("File too Large")
      image.value = null;
    }
  })
}

if (document.getElementById("update") != null) {
  updateload()
}

function updateload() {
  let name = localStorage.getItem("name");
  let requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch(`http://localhost:8080/student/${name}`, requestOptions)
    .then(res => res.json())
    .then(data => {
      document.getElementById("fname").value = data.fname;
      document.getElementById("lname").value = data.lname;
      document.getElementById("age").value = data.age;
      document.getElementById("address").value = data.address;
      document.getElementById("phone").value = data.phone;
      document.getElementById("grade").value = data.grade;
      document.getElementById("gender").value = data.gender;
      document.getElementById("photo").src = "data:image/*;base64," + data.photo;
    })
}

function addStudent() {
  if (localStorage.getItem("index") == null) {
    localStorage.setItem("index", 1);
  }
  window.location = "AddStudent.html";

}

function viewStudent() {
  window.location = "ViewStudent.html";
}

function main(){
  window.location="index.html";
}

function viewprofile() {
  window.location = "Viewprofile.html";

}

function Updatestudent() {
  window.location = "Updatestudent.html";
}

function load() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://localhost:8080/student", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let aray = JSON.parse(result);
      let table = `<thead>
              <tr class="table-dark">
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">age</th>
                <th scope="col">Grade</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="tbody">`;
      for (let i = 0; i < aray.length; i++) {
        table += `<tr>
                <th scope="row">${aray[i].id}</th>
                <td>${aray[i].fname}</td>
                <td>${aray[i].lname}</td>
                <td>${aray[i].age}</td>
                <td>${aray[i].grade}</td>
                <td><button onclick="edit('${aray[i].fname}',${aray[i].id})" class ="tblbtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"  viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button><button onclick="deletes(${aray[i].id})" class ="tblbtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"  viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button><button onclick="view('${aray[i].fname}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg></button></td>
              </tr>`
      };
      table += `</tbody>`;
      document.getElementById("table").innerHTML = table;
    })
}

function add() {
  let id = Number(localStorage.getItem("index"));
  let image = document.getElementById("image").files[0];
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let age = document.getElementById("age").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let grade = document.getElementById("grade").value;
  let gender = document.getElementById("gender").value;

  let raw1 = new FormData();
  raw1.append("student", new Blob([JSON.stringify({
    id: id,
    fname: fname,
    lname: lname,
    age: age,
    address: address,
    phone: phone,
    gender: gender,
    grade: grade
  })], { type: "application/json" }));

  raw1.append("image", image)


  const requestOptions = {
    method: "POST",
    body: raw1,
    redirect: "follow"
  };

  fetch("http://localhost:8080/student", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  document.getElementById("image").value = null;
  document.getElementById("fname").value = null;
  document.getElementById("lname").value = null;
  document.getElementById("age").value = null;
  document.getElementById("address").value = null;
  document.getElementById("phone").value = null;
  document.getElementById("grade").value = null;
  document.getElementById("gender").value = "Male";
  localStorage.setItem("index", id+1);

}

function deletes(index) {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };
  fetch(`http://localhost:8080/student/${index}`, requestOptions).then(res => res.json)
  window.location = "ViewStudent.html";
}

function view(value) {
  localStorage.setItem("name", value);
  viewprofile();
}

function edit(name,id) {
  localStorage.setItem("name", name);
  localStorage.setItem("id",id)
  Updatestudent()
}

function update() {
  let id = Number(localStorage.getItem("id"));
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let age = document.getElementById("age").value;
  let address = document.getElementById("address").value;
  let phone = document.getElementById("phone").value;
  let grade = document.getElementById("grade").value;
  let gender = document.getElementById("gender").value;

  let raw1 = new FormData();
  raw1.append("student", new Blob([JSON.stringify({
    id: id,
    fname: fname,
    lname: lname,
    age: age,
    address: address,
    phone: phone,
    gender: gender,
    grade: grade
  })], { type: "application/json" }));

  if (document.getElementById("image").files[0] != undefined) {
    let image = document.getElementById("image").files[0];
    raw1.append("image", image)

    const requestOptions = {
      method: "PUT",
      body: raw1,
      redirect: "follow"
    };

    fetch("http://localhost:8080/student/photo", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  else {
    const raw = JSON.stringify({
      id: id,
      fname: fname,
      lname: lname,
      age: age,
      phone: phone,
      address: address,
      grade: grade,
      gender: gender,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    console.log("else");

    fetch("http://localhost:8080/student", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  window.alert("Updated Successful!");
  window.location="ViewStudent.html";
}
