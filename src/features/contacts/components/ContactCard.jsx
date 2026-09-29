import Card from "../../../shared/components/Card";

function ContactCard({ contact }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{contact.name}</h3>
      <p className="text-gray-600">{contact.email}</p>
      <p className="text-gray-600">
        {contact.phone || "No phone number"}
      </p>
    </Card>
  );
}

export default ContactCard;
