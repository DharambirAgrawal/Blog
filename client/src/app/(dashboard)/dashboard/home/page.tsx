import { getUserData } from "../actions";
export default async function Dashboard() {
  const data = await getUserData();
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome back, {data.name}
        </h1>
      </div>
    </div>
  );
}
