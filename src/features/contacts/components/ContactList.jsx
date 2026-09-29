import ContactCard from "./ContactCard";

function ContactList({ contacts }) {
  if (contacts.length === 0) {
    return (
      <p className="text-gray-500">
        No contacts yet. Add your first contact.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
        />
      ))}
    </div>
  );
}

export default ContactList;