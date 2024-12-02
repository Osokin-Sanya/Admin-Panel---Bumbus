import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { fetchUser } from "../../../entities/users/user/api/thunkFetchUser";
import { selectUser } from "../../../entities/users/user/model/userSelectors";
import { fetchUserOrders } from "../../../entities/orders/user-orders/api/ordersThunks";
import { selectUserOrders } from "../../../entities/orders/user-orders/model/userOrdersSelectors";
import getStatusLabel from "../../../features/get-current-status/getStatusLabel";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ClientDetails = () => {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
      dispatch(fetchUserOrders(id));
    }
  }, [dispatch, id]);

  const { user, loading, error } = useAppSelector(selectUser);
  const { orders } = useAppSelector(selectUserOrders);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen -mt-72">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const { email, name } = user.identity_data;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-1  text-lg border border-red-100 hover:border-red-200  bg-slate-50 hover:bg-slate-100  text-gray-700 rounded-xl flex items-center gap-2 transition-colors"
      >
        <ArrowBackIcon />
        Назад
      </button>
      <div className="bg-white p-6 rounded-lg shadow-sm border  border-gray-200 mb-2 ">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Дані клієнта</h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-bold">ID #</span>
            {id}
          </p>
        </div>
        <div className="w-full gap-6">
          <div className="text-lg flex justify-around flex-row">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Ім'я</p>
              <p className="text-base text-gray-900">{name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-base text-gray-900">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Поточні замовлення
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Всього замовлень: {orders.length}
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {orders.map((order, index) => {
            const { address, products, status } = order;
            const {
              city,
              region,
              courierAddress: {
                street = "",
                house = "",
                apartment = "",
                floor = "",
                cargoElevator = "",
              } = {},
              selfPickupNovaPoshta,
              selfPickupPostomat,
            } = address || {};

            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
                <div className="p-6 hover:bg-gray-50 transition-colors duration-150  border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex gap-4 flex-1">
                      <img
                        src={products[0].imageUrl}
                        alt={products[0].title}
                        className="w-24 h-24 object-cover rounded-md border border-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base font-medium text-gray-900">
                            {products[0].title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {order.id}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {getStatusLabel({ status })}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1  text-start text-sm text-gray-500">
                          <p>
                            <span className="text-gray-600">Дата:</span>{" "}
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="text-gray-600 ">Доставка:</span>{" "}
                            {order.method}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 flex-1">
                      <div className="text-sm">
                        <p className="text-gray-500 mb-2 text-start font-bold">
                          Адреса доставки:
                        </p>
                        {street ? (
                          <div className="space-y-1  text-start  text-gray-600">
                            <p>
                              {city}, {region}
                            </p>
                            <p>
                              {street}, буд. {house}
                              {apartment && `, кв. ${apartment}`}
                            </p>
                            {(floor || cargoElevator) && (
                              <p className="text-xs text-gray-500">
                                {floor && `${floor} поверх`}
                                {cargoElevator && " • Є ліфт"}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-500  text-start">
                            {selfPickupNovaPoshta && (
                              <p>Нова Пошта: {selfPickupNovaPoshta}</p>
                            )}
                            {selfPickupPostomat && (
                              <p>Поштомат: {selfPickupPostomat}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {orders.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              У клієнта поки немає замовлень
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
