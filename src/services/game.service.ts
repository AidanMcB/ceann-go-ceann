import { getFirestore, collection, getDocs, addDoc, getDoc, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import app from '../../firebase';
import { User } from '@/interfaces/user.interface';
import { Game, GameState, Question } from '@/interfaces/game.interface';
import questionData from '../../public/questionData/questions.json';

const firestore = getFirestore(app);
const gamesCollection = "games";
const questionCollection = "questions";

export async function _getAllGames() {
    const q = query(collection(firestore, gamesCollection), where("state", "!=", GameState.Started));

    const allGames: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        allGames.push({
            id: doc.id, 
            ...doc.data()
        });
        console.log(doc.id, " => ", doc.data());
    });

    return allGames;
};

export async function _createGame(user: User, category: string): Promise<Game | undefined> {

    const questions = await _getQuestionsByCategory(category);

    const data = {
        name: `${user.username}'s Game`, 
        host_id: user.id, 
        players: [
            {...user, points: 0}
        ],
        questions: [...questions],
        category: category,
        state: GameState.WaitingForPlayers
    };
  
    const docRef = await addDoc(collection(firestore, gamesCollection), data);
    const games: Game[] = [];

    if(docRef) {
        const q = query(collection(firestore, gamesCollection), where("state", "!=", GameState.Started));
        const docSnap = await getDocs(q);
        docSnap.forEach(doc => {
            const { name, host_id, players, questions, state} = doc.data();
            games.push({ 
                name, 
                host_id,
                players, 
                questions,
                state,
                id: doc.id 
            });
        });
    }

    return games[0];
};

export async function _getAllQuestions() {
    const snapshot = await getDocs(collection(firestore, questionCollection));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    console.log(data);
    return data;
};

export async function _getQuestionsByCategory(category: string) {
    const q = query(collection(firestore, questionCollection), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
};

export async function _listenForGameStart(gameId: string) {
    onSnapshot(collection(firestore, gamesCollection), (snapshot) => {
        snapshot.docs.map((doc)=> {
            if(doc.id == gameId){
                const { state } = doc.data();
                return state;
            }
        });

    });
};

export async function _startGame(gameId: string) {
    const washingtonRef = doc(firestore, gamesCollection, gameId);

    // Atomically increment the population of the city by 50.
    await updateDoc(washingtonRef, {
        state: GameState.Started
    });
};
