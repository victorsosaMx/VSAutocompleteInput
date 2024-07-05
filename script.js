
const contacts = [
    { name: "Alejandro Pérez", email: "alejandro.perez@example.com" },
    { name: "María García", email: "maria.garcia@example.com" },
    { name: "Juan López", email: "juan.lopez@example.com" },
    { name: "Ana Martínez", email: "ana.martinez@example.com" },
    { name: "Carlos Sánchez", email: "carlos.sanchez@example.com" },
    { name: "Laura Fernández", email: "laura.fernandez@example.com" },
    { name: "Pedro Gómez", email: "pedro.gomez@example.com" },
    { name: "Elena Torres", email: "elena.torres@example.com" },
    { name: "Miguel Ramírez", email: "miguel.ramirez@example.com" },
    { name: "Carmen Díaz", email: "carmen.diaz@example.com" },
    { name: "Javier Muñoz", email: "javier.munoz@example.com" },
    { name: "Isabel Ruiz", email: "isabel.ruiz@example.com" },
    { name: "Luis Morales", email: "luis.morales@example.com" },
    { name: "Teresa Ortega", email: "teresa.ortega@example.com" },
    { name: "Francisco Vega", email: "francisco.vega@example.com" },
    { name: "Marta Herrera", email: "marta.herrera@example.com" },
    { name: "Sergio Navarro", email: "sergio.navarro@example.com" },
    { name: "Gloria Rivas", email: "gloria.rivas@example.com" },
    { name: "Raúl Castillo", email: "raul.castillo@example.com" },
    { name: "Patricia Romero", email: "patricia.romero@example.com" }
];

function autocomplete(input, contacts) {
    let currentFocus;
    input.addEventListener("input", function () {
        let val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        let listContainer = document.createElement("div");
        listContainer.setAttribute("id", this.id + "autocomplete-list");
        listContainer.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(listContainer);

        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].name.toUpperCase().includes(val.toUpperCase())) {
                let listItem = document.createElement("div");
                let startIdx = contacts[i].name.toUpperCase().indexOf(val.toUpperCase());
                listItem.innerHTML = contacts[i].name.substr(0, startIdx) + "<strong>" + contacts[i].name.substr(startIdx, val.length) + "</strong>" + contacts[i].name.substr(startIdx + val.length);
                listItem.innerHTML += "<input type='hidden' value='" + contacts[i].name + "'>";
                listItem.innerHTML += "<input type='hidden' value='" + contacts[i].email + "'>";
                listItem.addEventListener("click", function () {
                    let name = this.getElementsByTagName("input")[0].value;
                    let email = this.getElementsByTagName("input")[1].value;
                    addTag(name, email);
                    input.value = "";
                    closeAllLists();
                });
                listContainer.appendChild(listItem);
            }
        }
    });

    input.addEventListener("keydown", function (e) {
        let list = document.getElementById(this.id + "autocomplete-list");
        if (list) list = list.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(list);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(list);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (list) list[currentFocus].click();
            }
        }
    });

    function addActive(list) {
        if (!list) return false;
        removeActive(list);
        if (currentFocus >= list.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (list.length - 1);
        list[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(element) {
        let items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
            if (element !== items[i] && element !== input) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function addTag(name, email) {
    let tagContainer = document.createElement("span");
    tagContainer.setAttribute("class", "tag");
    tagContainer.innerHTML = name + " <small>(" + email + ")</small><span class='remove-tag'>&times;</span>";

    document.getElementById("tagsContainer").appendChild(tagContainer);

    tagContainer.querySelector(".remove-tag").addEventListener("click", function () {
        tagContainer.remove();
        updateEmailField();
    });

    updateEmailField();
}

function updateEmailField() {
    let tags = document.querySelectorAll("#tagsContainer .tag");
    let emails = [];
    tags.forEach(tag => {
        let email = tag.innerHTML.match(/\(([^)]+)\)/)[1];
        emails.push(email);
    });
    document.getElementById("txtCC").value = emails.join('; ');
}

autocomplete(document.getElementById("autocompleteInput"), contacts);
