import { AuthForm } from "../../features/auth/AuthForm";

export const AuthPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Панель керування
            </h1>
            <p className="text-gray-600">
              Увійдіть до свого облікового запису для доступу
            </p>
          </div>
          <AuthForm />
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Виникли проблеми з входом? {""}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Зв'яжіться з підтримкою
              </a>
            </p>
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          Дані для входу: <br />
          <strong>Email:</strong> superadmin@gmail.com <br />
          <strong>Password:</strong> superadmin@gmail.com
        </p>
      </div>
    </div>
  );
};
