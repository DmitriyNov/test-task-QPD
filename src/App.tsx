import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OutletContext } from "./models/EmployeeModel";
import Header from "./components/Header";

export default function App() {

  // При загрузке приложения сразу переходим на страницу с списком сотрудников
  const navigation = useNavigate();
  useEffect(() => {
    navigation("/list");
  }, []);

  // Текущий id выбранного сотрудника для отрисовки карточки
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  function handlerSetCurrentItemId(id: number) {
    setCurrentItemId(id);
  }

  useEffect(() => {
    if (currentItemId !== null) {
      navigation("/card");
    } else {
      navigation("/list");
    }
  }, [currentItemId]);

  return (
    <div>
      <Header />
      <Outlet context={{currentItemId: currentItemId, handlerSetCurrentItemId: handlerSetCurrentItemId} satisfies OutletContext}/>
    </div>
  )
}
