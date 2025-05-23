import { useState, useEffect } from 'react';
import {
  auth,
  googleProvider
} from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        {user ? (
          <>
            <p className="text-center"> Вітаю, {user.email}</p>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition"
            >
              Вийти
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Пароль..."
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isRegister ? 'Зареєструватися' : 'Увійти'}
            </button>
            <button
              onClick={signInWithGoogle}
              className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Увійти через Google
            </button>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="w-full text-blue-500 text-sm"
            >
              {isRegister
                ? 'Вже маєте акаунт? Увійти'
                : 'Немає акаунта? Зареєструватися'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
