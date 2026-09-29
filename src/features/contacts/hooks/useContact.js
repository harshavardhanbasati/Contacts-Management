import useFetch from "../../../shared/hooks/useFetch";

const API_URL = import.meta.env.VITE_API_URL;

function useContacts() {
  const {
    data,
    status,
    refetch,
  } = useFetch(`${API_URL}/contacts`);

  return {
    contacts: data,
    status,
    refetch,
  };
}

export default useContacts;