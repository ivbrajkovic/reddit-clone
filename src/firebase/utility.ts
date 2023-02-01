import { firestore } from "@/firebase/clientApp";
import { doc, getDoc, runTransaction, Transaction } from "firebase/firestore";

export const getDocByRefAsync = (path: string, ...pathSegments: string[]) => {
  const docRef = doc(firestore, path, ...pathSegments);
  return getDoc(docRef);
};

export const docRef = (path: string, ...pathSegments: string[]) =>
  doc(firestore, path, ...pathSegments);

export const runTransactionAsync = <T>(
  callback: (transaction: Transaction) => Promise<T>,
) => runTransaction<T>(firestore, callback);
