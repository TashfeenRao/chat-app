import { useEffect, useState } from "react";
import { db } from "../firebase";

const useCollection = (path, order) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    db.collection(path)
      .orderBy(order)
      .onSnapshot((snapshot) => {
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
