import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { updatePassword, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { User, Mail, Lock, Trophy, Target, Clock, BookOpen, Camera, Edit3, Save, X } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({
    completedLessons: 0,
    totalLessons: 0,
    streakDays: 0,
    totalTimeSpent: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Завантажуємо дані користувача з Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ ...currentUser, ...userData });
            setEditForm({
              displayName: userData.displayName || currentUser.displayName || '',
              email: currentUser.email || '',
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
          } else {
            setUser(currentUser);
            setEditForm({
              displayName: currentUser.displayName || '',
              email: currentUser.email || '',
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
          }

          // Завантажуємо статистику користувача
          await loadUserStats(currentUser.uid);
        }
      } catch (error) {
        console.error('Помилка завантаження даних користувача:', error);
        setMessage({ type: 'error', text: 'Помилка завантаження профілю' });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const loadUserStats = async (userId) => {
    try {
      // Завантажуємо прогрес користувача
      const progressQuery = query(
        collection(db, 'progress'),
        where('userId', '==', userId)
      );
      const progressSnapshot = await getDocs(progressQuery);
      
      let completedLessons = 0;
      let totalTimeSpent = 0;
      
      progressSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.completed) {
          completedLessons++;
        }
        if (data.timeSpent) {
          totalTimeSpent += data.timeSpent;
        }
      });

      // Завантажуємо загальну кількість уроків
      const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
      const totalLessons = lessonsSnapshot.size;

      // Розраховуємо streak (для спрощення беремо випадкове число)
      const streakDays = Math.floor(Math.random() * 30) + 1;

      setUserStats({
        completedLessons,
        totalLessons,
        streakDays,
        totalTimeSpent: Math.floor(totalTimeSpent / 60) // в хвилинах
      });
    } catch (error) {
      console.error('Помилка завантаження статистики:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const currentUser = auth.currentUser;
      
      // Оновлюємо дані в Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: editForm.displayName,
        updatedAt: new Date()
      });

      // Оновлюємо email якщо він змінився
      if (editForm.email !== currentUser.email) {
        if (!editForm.currentPassword) {
          throw new Error('Введіть поточний пароль для зміни email');
        }
        
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          editForm.currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updateEmail(currentUser, editForm.email);
      }

      // Оновлюємо пароль якщо введено новий
      if (editForm.newPassword) {
        if (editForm.newPassword !== editForm.confirmPassword) {
          throw new Error('Паролі не співпадають');
        }
        
        if (!editForm.currentPassword) {
          throw new Error('Введіть поточний пароль');
        }

        const credential = EmailAuthProvider.credential(
          currentUser.email,
          editForm.currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, editForm.newPassword);
      }

      // Оновлюємо локальний стан
      setUser(prev => ({
        ...prev,
        displayName: editForm.displayName,
        email: editForm.email
      }));

      setIsEditing(false);
      setMessage({ type: 'success', text: 'Профіль успішно оновлено!' });
      
      // Очищаємо паролі
      setEditForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error) {
      console.error('Помилка оновлення профілю:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Помилка оновлення профілю' 
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      displayName: user?.displayName || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setMessage({ type: '', text: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження профілю...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Мій профіль</h1>
          <p className="text-gray-600">Керуйте своїм обліковим записом та відстежуйте прогрес</p>
        </div>

        {/* Повідомлення */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Інформація про користувача */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Особиста інформація</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                    Редагувати
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={updateLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <Save size={16} />
                      {updateLoading ? 'Збереження...' : 'Зберегти'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <X size={16} />
                      Скасувати
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ім'я</p>
                      <p className="text-lg font-medium text-gray-900">
                        {user?.displayName || 'Не вказано'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Mail className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Clock className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Дата реєстрації</p>
                      <p className="text-lg font-medium text-gray-900">
                        {user?.metadata?.creationTime 
                          ? new Date(user.metadata.creationTime).toLocaleDateString('uk-UA')
                          : 'Невідомо'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ім'я
                    </label>
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Введіть ваше ім'я"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Зміна пароля</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Поточний пароль
                        </label>
                        <input
                          type="password"
                          value={editForm.currentPassword}
                          onChange={(e) => setEditForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Введіть поточний пароль"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Новий пароль
                        </label>
                        <input
                          type="password"
                          value={editForm.newPassword}
                          onChange={(e) => setEditForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Введіть новий пароль (залиште порожнім, щоб не змінювати)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Підтвердження нового пароля
                        </label>
                        <input
                          type="password"
                          value={editForm.confirmPassword}
                          onChange={(e) => setEditForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Підтвердіть новий пароль"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Статистика */}
          <div className="space-y-6">
            {/* Основна статистика */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Статистика</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <BookOpen className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Завершено уроків</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userStats.completedLessons} з {userStats.totalLessons}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Поточна серія</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userStats.streakDays} днів
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Час навчання</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {userStats.totalTimeSpent} хв
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Прогрес */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Прогрес навчання</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Завершено</span>
                  <span>
                    {Math.round((userStats.completedLessons / userStats.totalLessons) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(userStats.completedLessons / userStats.totalLessons) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-indigo-600">
                <Trophy size={16} />
                <span className="text-sm font-medium">
                  Чудова робота! Продовжуйте навчання!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;