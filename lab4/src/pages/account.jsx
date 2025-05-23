import { useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  storage,
  db
} from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        } else {
          // Create initial user profile if it doesn't exist
          const initialProfile = {
            email: currentUser.email,
            name: currentUser.displayName || currentUser.email.split('@')[0],
            photoURL: currentUser.photoURL,
            createdAt: new Date().toISOString(),
            courses: []
          };
          await setDoc(doc(db, 'users', currentUser.uid), initialProfile);
          setUserProfile(initialProfile);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create initial user profile in Firestore
        const initialProfile = {
          email: email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
          courses: []
        };
        await setDoc(doc(db, 'users', userCredential.user.uid), initialProfile);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Create or update user profile in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          courses: []
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
      setLoading(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const storageRef = ref(storage, `profilePics/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        photoURL: downloadURL
      }, { merge: true });

      // Update auth profile
      await updateProfile(user, {
        photoURL: downloadURL
      });

      setUserProfile(prev => ({ ...prev, photoURL: downloadURL }));
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
      setLoading(false);
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
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {userProfile?.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl">
                    {userProfile?.name?.[0] || user.email?.[0] || '?'}
                  </div>
                )}
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                  disabled={loading}
                />
              </div>
              <p className="text-center text-lg font-medium">
                {userProfile?.name || user.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? 'Завантаження...' : 'Вийти'}
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Пароль..."
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Завантаження...' : (isRegister ? 'Зареєструватися' : 'Увійти')}
            </button>
            <button
              onClick={signInWithGoogle}
              className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition flex items-center justify-center space-x-2"
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              <span>Увійти через Google</span>
            </button>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="w-full text-blue-500 text-sm"
              disabled={loading}
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
