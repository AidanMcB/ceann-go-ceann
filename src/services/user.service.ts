import { getFirestore, collection, getDocs, addDoc, getDoc } from 'firebase/firestore';
import app from '../../firebase';
import { User } from '@/interfaces/user.interface';

const firestore = getFirestore(app);
const userCollection = "users";

export async function _getUsers() {
  const snapshot = await getDocs(collection(firestore, userCollection));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(data);
  return data;
}

export async function _createUser(newUsername: string): Promise<User | undefined> {
    const data = {username: newUsername};
  
    const docRef = await addDoc(collection(firestore, userCollection), data);

    if(docRef) {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("New user data:", docSnap.data());
            return { 
                username: docSnap.data()?.username, 
                id: docSnap.id,
                isReady: false
            };
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }   
    }
    return undefined;
}
