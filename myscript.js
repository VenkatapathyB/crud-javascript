
// add student

function addStudent() {
  var x = document.getElementById("myDiv");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
  
}
// submit form

var selectedRow = null;
var result = [];
function onFormSubmit() {

    var formData = readFormData();
   
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["firstname"] = document.getElementById("firstname").value;
    formData["fname"] = document.getElementById("fname").value;
    formData["dob"] = document.getElementById("dob").value;
    formData["address"] = document.getElementById("address").value;

  
    return formData;
}

// create data
function insertNewRecord(data) {  
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.dob;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.address;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = ` <button class="editbtn" onClick="onEdit(this)">Edit</button>
                    <button class="deletebtn" onClick="onDelete(this)">Delete</button>`


      //  let formData;
      //  if(localStorage.getItem('tasks') == null){
      //   tasks = [];
      //  } else {
      //   tasks = JSON.parse(localStorage.getItem('tasks'))
      //  }    
      //  tasks.push(task); 

      // localStorage.setItem('formData',json.stringify(formData));      

     
    if(localStorage.getItem('result') == null){
      // result = [];
    } else {
      result = JSON.parse(localStorage.getItem('result'));
    }

    var studentRecord = [{firstname :data.firstname ,fname :data.fname , dob:data.dob, address :data.address }];
    result.push(studentRecord);

    localStorage.setItem('result' , JSON.stringify(result))
    console.log(result);
}
// if(localStorage.getItem('Data') != ''){
    //   var data = localStorage.getItem('Data') 
    //   localStorage.setItem('Datafsdf' , data)
    //  }
    // localStorage.setItem('Data' , JSON.stringify(result))
function resetForm() {
    document.getElementById("firstname").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("address").value = "";
    selectedRow = null;
}
//  Edit table
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("dob").value = selectedRow.cells[2].innerHTML;
    document.getElementById("address").value = selectedRow.cells[3].innerHTML;
}
// Update table
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstname;
    selectedRow.cells[1].innerHTML = formData.fname;
    selectedRow.cells[2].innerHTML = formData.dob;
    selectedRow.cells[3].innerHTML = formData.address;
}
// Delete table
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("studentList").deleteRow(row.rowIndex);
        resetForm();
    }
}


// searching

function myFunction() {
    var input, filter, table, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("studentList");
    var tbodytr = table.tBodies[0].rows
    // tr = table.getElementsByTagName("tr");
    // td = table.getElementsByTagName("td");
    for (var i = 0; i < tbodytr.length; i++) {
      var tds = tbodytr[i].getElementsByTagName("td");
      var flag = false;
      for(var j = 0; j < tds.length; j++){
        var td = tds[j];
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          flag = true;
        } 
      }
      if(flag) {
        tbodytr[i].style.display = "table-row";
      }
      else {
        tbodytr[i].style.display = "none";
      }
    }
  }

//   sorting table

function sortTable(n) {
  var table,rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("studentList");
  switching = true;

  dir = "asc";
 
  while (switching) {

    switching = false;
    rows = table.rows;
    
    for (i = 1; i < rows.length - 1; i++) { 
    
      shouldSwitch = false;
     
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
     

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
  
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      
      switchcount++;
    } else {
     
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// paging

const pageSize = 3;
let curPage = 1;

document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);



function renderTable() {
  // create html
  let result1 = '';
  data.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end =curPage*pageSize;
        if(index >= start && index < end) return true;
  }).forEach(c => {
     result += `<tr>
     <td>${c.firstname}</td>
     <td>${c.fname}</td>
     <td>${c.dob}</td>
     <td>${c.address}</td>
     </tr>`;
  });
  table.innerHTML = result1;
}


function previousPage() {
  if(curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if((curPage * pageSize) < data.length) curPage++;
  renderTable();
}


// function sortTable() {
//     debugger;
//     var table, rows, switching, i, x, y, sortswitch;
//     table = document.getElementById("studentList");
//     switching = true;
   
//     while (switching) {
//       switching = false;
//       rows = table.rows;
      
//       for (i = 1; i < (rows.length - 1); i++) {
       
//         sortswitch = false;
       
//         x = rows[i].getElementsByTagName("td")[0];
//         y = rows[i + 1].getElementsByTagName("td")[0];
       
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          
//           sortswitch = true;
//           break;
//         }
//       }
//       if (sortswitch) {
       
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//       }
//     }
//   }

// save in localStorage

// var students = [];

// function store() {
//   if(localStorage.studentRecord){
//     students = JSON.parse(localStorage.studentRecord);
//     for(i=0;i<students.length;i++); {
//       insertNewRecord(students.firstname,students.fname,students.dob,students.address)
//     }
//   }
// }

// function submitForm() {
//   var firstname = document.getElementById("firstname").value;
//   var fname = document.getElementById("fname").value;
//   var dob = document.getElementById("dob").value;
//   var address = document.getElementById("address").value;

//   var stuobj = { firstname:firstname ,fname:fname, dob:dob, address:address};
//   students.push(stuobj);

//   localStorage.studentRecord = JSON.stringify(students);
//   store();

//   insertNewRecord (firstname ,fname ,dob ,address);

//   document.getElementById("firstname").value = "data.firstname";
//   document.getElementById("fname").value = "data.fname";
//   document.getElementById("dob").value = "data.dob";
//   document.getElementById("address").value = "data.address";
// }

// function insertNewRecord(data) {
//   var table = document.getElementById("record");
//   var newRow = table.insertRow(data);
//   cell1 = newRow.insertCell(0);
//   cell1.innerHTML = data.firstname;
//   cell2 = newRow.insertCell(1);
//   cell2.innerHTML = data.fname;
//   cell3 = newRow.insertCell(2);
//   cell3.innerHTML = data.dob;
//   cell4 = newRow.insertCell(3);
//   cell4.innerHTML = data.address;
//   cell5 = newRow.insertCell(4);
//   cell5.innerHTML = ` <button class="editbtn" onClick="onEdit(this)">Edit</button>
//                   <button class="deletebtn" onClick="onDelete(this)">Delete</button>`
// }



// hfghgfhhfgfhgfhjgjhgjghjghjghjhgj

    //  var student = []   
               
      //  var stuobj = { firstname:firstname ,fname:fname, dob:dob, address:address};
      //    students.push(stuobj);+
      
  //       localStorage.studentRecord = JSON.stringify(student);
      

  //   var fuln = localStorage.setItem("Name",data.firstname);
  //   var fathern = localStorage.setItem("FatherName",data.fname);
  //   var birth = localStorage.setItem("D.O.B",data.dob);
  //   var add = localStorage.setItem("Address",data.address);


  //   localStorage.studentRecord = JSON.parse(student);
      

  //  let fuln1 = localStorage.getItem("Name",fuln);
  //  let fathern1 = localStorage.getItem("FatherName",fathern);
  //  let birth1 = localStorage.getItem("D.O.B",birth);
  //  let add1 = localStorage.getItem("Address",add);


  //  var arr = [fuln1 , fathern1 ,birth1, add1];
  //  return arr ;


