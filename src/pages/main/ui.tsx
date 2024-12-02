import React from "react";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Адміністративна панель інтернет-магазину
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Управління товарами</h2>
          <p className="text-gray-600 mb-4">
            Додавання, редагування та видалення товарів. Керування складськими залишками та цінами.
          </p>
          <button
            onClick={() => navigate("/warehouse")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Перейти до товарів
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Замовлення</h2>
          <p className="text-gray-600 mb-4">
            Перегляд та обробка замовлень. Оновлення статусів та керування доставкою.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Перейти до замовлень
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Користувачі</h2>
          <p className="text-gray-600 mb-4">
            Управління користувачами, перегляд інформації та історії замовлень.
          </p>
          <button
            onClick={() => navigate("/users")}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            Перейти до користувачів
          </button>
        </div>
      </div>

    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        <span className="text-blue-600">Про</span> систему
      </h2>
    
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 text-blue-600 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Швидкий старт
          </h3>
          <p className="text-gray-600">
            Ця адміністративна панель розроблена для ефективного управління інтернет-магазином спортивного взуття <a href="https://vue-shop-eb9.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 transition-colors hover:text-blue-800 text-lg">"Bumbus"</a>.
            Система надає зручний інтерфейс для роботи з товарами, замовленнями та користувачами.
          </p>
        
        </div>
    
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 text-green-600 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Основні можливості
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Управління товарами: Перегляд, фільтрація, додавання, редагування
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Робота із замовленнями: Перегляд списку, оновлення статусів
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Управління користувачами: Профілі, права доступу
            </li>
          </ul>
        </div>
      </div>
    
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-6 text-purple-600 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Технічний стек
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'TypeScript', color: 'blue' },
            { name: 'React', color: 'cyan' },
            { name: 'Redux Toolkit', color: 'purple' },
            { name: 'Tailwind CSS', color: 'green' },
            { name: 'React Router', color: 'red' },
            { name: 'Feature-Sliced Design', color: 'yellow' }
          ].map((tech, index) => (
            <div 
              key={index}
              className={`bg-${tech.color}-50 p-3 rounded-lg text-center transform hover:scale-105 transition-all duration-300 cursor-pointer border border-${tech.color}-200`}
            >
              <span className={`text-${tech.color}-600 font-medium`}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <p className="text-gray-700 font-medium text-center italic">
          "Проект побудований з використанням модульної архітектури, що забезпечує легку масштабованість
          та чіткий поділ відповідальності між компонентами"
        </p>
      </div>
    </div>
    </div>
  );
};

export default Main;
