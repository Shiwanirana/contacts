let contacts = []
loadContacts()

function addContact(event){
  event.preventDefault()
  let form = event.target
  generateId()
  let contact= {
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked}
    contacts.push(contact)
    saveContacts()
    form.reset()
    }



function saveContacts(){
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}
function loadContacts(){
  let storedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if(storedContacts){
    contacts = storedContacts
  }
}

function drawContacts(){
  let contactListElement = document.getElementById("contact-list")
  let contactstemplate = ``
  contacts.forEach(contact => {
    contactstemplate += `
      <div class="contact-card card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact': ''}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
      <div class="d-flex space-between">
        <p>
        <i class="fa fa-phone" aria-hidden="true"></i>
        <span>${contact.phone}</span>
      </p>
        <i class=" delete fa fa-trash-o" aria-hidden="true" onclick="removeContact(${contact.id})"></i>
      </div>
      </div>
      `
  });
  contactListElement.innerHTML= contactstemplate
}

function removeContact(contactId){
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index ==-1){
    throw new Error("invalid contact Id");
  } 
  contacts.splice(index,1)
  saveContacts()
}

function toggleAddContactForm(){
  document.getElementById("new-contact-form").classList.toggle("hidden")
}

function generateId(){
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadContacts()
drawContacts()