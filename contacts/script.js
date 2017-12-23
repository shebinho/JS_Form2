function Contact(id, name, lastName, email) {
    this.id = id;
    this.firstName = name;
    this.lastName = lastName;
    this.email = email;
}

function AddressBook() {
    let table = document.getElementById('contacts-table');
    let form = document.getElementById('contacts-form');
    let discard = document.getElementById('contacts-op-discard');
    let contactNo;
    let self = this; //here the "this" keyword is the adddress book object

    this.init = function() {
        contactNo = 1;

        discard.addEventListener('click', function(){
            form.reset();
            form.id_entry.value = 0;
        });

        form.addEventListener('submit', function(e){
            e.preventDefault();
            //selecting the input elements
            //here the "this" keyword is the form element
            let firstName = this.first_name.value;
            let lastName = this.last_name.value;
            let email = this.email.value;
            let id_entry = this.id_entry.value;

            if (id_entry == 0) {
                let c = new Contact(contactNo, firstName, lastName, email);
                self.addRow(c);
                contactNo++;
            } else {
                let c = new Contact(id_entry, firstName, lastName, email);
                self.editRow(c);
            }

            discard.click();
        });
    }

    this.editRow = function(contact) {
        let row = document.getElementById(`row-${contact.id}`);
        row.children[1].textContent = contact.firstName;
        row.children[2].textContent = contact.lastName;
        row.children[3].textContent = contact.email;
    }

    this.addRow = function(contact) {
        var _this = this;
        let row = document.createElement("tr");
        // row.id = `row-${contact.id}`;
        //create an id attribute
        let rowId = document.createAttribute('id');
        rowId.value = `row-${contact.id}`;
        
        row.setAttributeNode(rowId);
        

        // row.addEventListener('click', function() {
        //     console.log('row clicked');
        // });
        
        let td1 = document.createElement("td");
        td1.textContent = contact.id;
        row.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = contact.firstName;
        row.appendChild(td2);

        let td3 = document.createElement("td");
        td3.textContent = contact.lastName;
        row.appendChild(td3);

        let td4 = document.createElement("td");
        td4.textContent = contact.email;
        row.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = `<a data-id="${contact.id}" id="edit-${contact.id}" class="edit" href="#">edit</a> | <a id="delete-${contact.id}" href="#">delete</a>`;
        row.appendChild(td5);

        table.appendChild(row);

        document.getElementById(`delete-${contact.id}`).addEventListener('click', function(e){
            e.preventDefault();
            this.parentNode.parentNode.remove();
        });

        var edit = document.getElementById(`edit-${contact.id}`);
        edit.addEventListener('click', function(){
            var id = this.getAttribute ("data-id");
            var row = document.getElementById("row-" +id);

            var cId = row.children[0].textContent;
            var cName = row.children[1].textContent;
            var cLastName = row.children[2].textContent;
            var cEmail = row.children[3].textContent;

            

            var c = new Contact(cId,cName,cLastName,cEmail);
            _this.editRow(c,id);
            

        

            
        });

        this.editRow = function(contact, rowId){
            var row = document.getElementById("row-"+rowId);
            row.children[1].innerHTML = `<input type="text" value= ${contact.firstName} />`;
            row.children[2].innerHTML = `<input type="text" value= ${contact.lastName} />`;
            row.children[3].innerHTML = `<input type="text" value= ${contact.email} />`;

        }

        //not good
        //we'll attach the event listener multiple times to some of the elements
        // let elements = document.querySelectorAll('.edit');
        // for(let i=0; i < elements.length; i++) {
        //     elements[i].addEventListener('click', function(){
        //         console.log("dfsdfs"+ i);
        //     });
        // }
    }
}
let addressBook1 = new AddressBook();
addressBook1.init();
console.log(addressBook1);

// let addressBook1 = {
//     init: function() {

//     }
// }

document.getElementById('google').addEventListener('click', function(e){
    e.preventDefault();
    console.log('google link clicked');
});