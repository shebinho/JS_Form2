function Contact(id, first_name, last_name, email) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
}

function AddressBook() {
    var contact = [];
    var index = 1;

    var form = document.getElementById("contacts-form");
    var table = document.getElementById("contacts-table");
    var save = document.getElementById("contacts-op-save");
    var discard = document.getElementById("contacts-op-discard");

    this.init = function () {
        var self = this;
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = this.first_name.value;
            var lastName = this.last_name.value;
            var email = this.email.value;
            var id = index;

            var contact = new Contact(id, name, lastName, email);

            self.addRow(contact, contact.id, "save");
            this.reset();
            index++;
        });

        discard.addEventListener("click", function () {
            form.reset();
        });


    }

    this.addRow = function (contact, rowId, mode) {
        var _this = this;
        if (mode === "save") {
            var tr = document.createElement("tr");
            var attr = document.createAttribute("id");
            attr.value = "row-" + contact.id;
            tr.setAttributeNode(attr);
        }
        else {
            var tr = document.getElementById("row-" + rowId); 
            tr.innerHTML = "";               
        }

        var td = document.createElement("td");
        td.textContent = contact.id;
        tr.appendChild(td)

        var td1 = document.createElement("td");
        td1.textContent = contact.firstName;
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.textContent = contact.lastName;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.textContent = contact.email;
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerHTML = `<a href='#' data-id='${contact.id}' id='edit-${contact.id}'>edit</a> | 
        <a href='#' data-id='${contact.id}' id='delete-${contact.id}'>delete</a>`;
        tr.appendChild(td4);


        table.appendChild(tr);

        var deleteBtn = document.getElementById(`delete-${contact.id}`);
        deleteBtn.addEventListener("click", function () {
            var id = this.getAttribute("data-id");
            var row = document.getElementById("row-" + id);
            row.remove();
        });

        var edit = document.getElementById(`edit-${contact.id}`);
        edit.addEventListener("click", function () {
            debugger;
            var id = this.getAttribute("data-id");
            var row = document.getElementById("row-" + id);

            var cId = row.children[0].textContent;
            var cName = row.children[1].textContent;
            var cLastName = row.children[2].textContent;
            var cEmail = row.children[3].textContent;

            var c = new Contact(cId, cName, cLastName, cEmail);

            _this.editRow(c, id);


        })
    };

    this.editRow = function (contact, rowId) {
        var __this = this;
        var row = document.getElementById("row-" + rowId);

        row.children[1].innerHTML = `<input type="text" value="${contact.firstName}">`;
        row.children[2].innerHTML = `<input type="text" value="${contact.lastName}">`;
        row.children[3].innerHTML = `<input type="text" value="${contact.email}">`;
        row.children[4].innerHTML = `<a href='#' data-id='${contact.id}' id='save-${contact.id}'>save</a>`

        var saveInlineBtn = document.getElementById(`save-${contact.id}`);
        saveInlineBtn.addEventListener("click", function () {
        debugger;
        
            var id = this.getAttribute("data-id");
            var row = document.getElementById("row-" + id);

            var cId = row.children[0].textContent;
            var cName = row.children[1].children[0].value;
            var cLastName = row.children[2].children[0].value;
            var cEmail = row.children[3].children[0].value;

            var c = new Contact(cId, cName, cLastName, cEmail);

            __this.addRow(c, id, "edit");
        })

    }





}

var addressBook = new AddressBook();
addressBook.init();