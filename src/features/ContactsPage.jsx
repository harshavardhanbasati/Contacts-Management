import useContacts from "./contacts/hooks/useContact";
import ContactList from "./contacts/components/ContactList";
import ContactForm from "./contacts/components/ContactForm";
import Button from "../shared/components/Button";
import Card from "../shared/components/Card";

function ContactsPage() {
  const {
    contacts,
    status,
    refetch,
  } = useContacts();

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Contact Management
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <h2 className="mb-4 text-xl font-semibold">
              Add Contact
            </h2>

            <ContactForm onContactAdded={refetch} />
          </Card>

          <section className="md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">
              Contacts
            </h2>

            {status === "loading" && (
              <p className="text-gray-500">
                Loading contacts...
              </p>
            )}

            {status === "error" && (
              <div className="space-y-3">
                <p className="text-red-600">
                  Failed to load contacts.
                </p>

                <Button onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            )}

            {status === "success" && (
              <ContactList contacts={contacts} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ContactsPage;