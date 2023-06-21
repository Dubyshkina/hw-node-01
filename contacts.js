const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join("./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async (id) => {
    const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === id);
  return contact || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const removeCont = contacts.findIndex((contact) => contact.id === id);
  if (removeCont === -1) {
    return null;
  }
  const [contactsNew] = contacts.splice(removeCont, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactsNew;
};

const addContact = async ({name, email, phone}) => {
    const contacts = await listContacts();
const newContact = {
    id:nanoid(),
   name,
   email,
   phone
}
contacts.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
return newContact;
}
module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };