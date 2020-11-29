import { db } from "../firebase";
const { useState, useEffect } = require("react");

const cache = {};
const pendingChache = {};

const useDoc = (path) => {
  const [docs, setDocs] = useState(cache[path]);
  useEffect(() => {
    if (docs) {
      return;
    }
    let stillMounted = true;
    const pending = pendingChache[path];

    const promise = pending || (pendingChache[path] = db.doc(path).get());

    promise.then((doc) => {
      if (stillMounted) {
        const user = { ...doc.data(), id: doc.id };
        setDocs(user);
        cache[path] = user;
      }
    });
    return () => {
      stillMounted = false;
    };
  }, [path, docs]);
  return docs;
};
export default useDoc;
