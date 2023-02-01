import { firestore } from "@/firebase/clientApp";
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import { curryN } from "ramda";

export const isDocumentExists = (doc: DocumentSnapshot<DocumentData>) =>
  doc.exists();

export const docFromFirestore = curryN(
  2,
  (path: string, ...pathSegments: string[]) =>
    doc(firestore, path, ...pathSegments),
);

// export const getDocFromTransition = curryN(
//   2,
//   (docRef: DocumentReference, transaction: Transaction) =>
//     transaction.get(docRef),
// );

export const getDocFromTransition = curryN(
  3,
  (transaction: Transaction, path: string, ...pathSegments: string[]) => {
    const docRef = doc(firestore, path, ...pathSegments);
    return transaction.get(docRef);
  },
);

export const runTransactionAsync = <T>(
  callback: (transaction: Transaction) => Promise<T>,
) => runTransaction<T>(firestore, callback);

export const checkIfDocExists = async (docRef: DocumentReference) => {
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const throwIfDocumentExistsTrans =
  (documentRef: DocumentReference) => async (transaction: Transaction) => {
    const document = await transaction.get(documentRef);
    if (document.exists()) throw new Error("Document already exists");
    return transaction;
  };
