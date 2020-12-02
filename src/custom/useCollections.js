import { useEffect, useState } from "react";
import { db } from "../firebase";

const useCollection = (path, order, where = []) => {
  const [docs, setDocs] = useState([]);
  const [query, operator, value] = where;

  useEffect(() => {
    let collection = db.collection(path);

    if (order) {
      collection = db.collection(path).orderBy(order);
    }

    if (query) {
      collection = collection.where(query, operator, value);
    }
    return collection.onSnapshot((snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDocs(docs);
    });
  }, [path, order, query, operator, value]);
  return docs;
};
export default useCollection;
