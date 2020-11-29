import { useEffect, useState } from "react";
import { db } from "../firebase";

const useCollection = (path, order) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    let collection = db.collection(path);
    if (order) {
      collection = db.collection(path).orderBy(order);
    }
    collection.onSnapshot((snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDocs(docs);
    });
  }, []);
  return docs;
};
export default useCollection;
