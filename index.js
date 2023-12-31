const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      case "get":
        const contact = await contacts.getContactById(id);
        return console.log(contact);
      case "add":
        const addContact = await contacts.addContact({ name, email, phone });
        return console.log(addContact);
      case "remove":
        const removeContact = await contacts.removeContact(id);
        return console.log(removeContact);
      default:
        return console.warn("Unknown action");
    }
  };
  program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

invokeAction(options);
