export default async function ReservationPage({ params }) {
  const { code } = await params;

  const res = await fetch(`http://localhost:8080/api/reservation/${code}`, {
    cache: "no-store",
  });
  const data = await res.json();

  if (!res.ok || !data) {
    return <p className="p-4 text-red-500">No se encontrp la reserva</p>;
  }

  return (
    <div className="h-screen bg-[#070608] text-white flex flex-col items-center justify-center px-5">
      <h1 className="text-2xl font-bold">Reserva Confirmada</h1>
      <div className="mt-4 space-y-2 text-white">
        <p>
          <strong>Código:</strong> {data.code}
        </p>
        <p>
          <strong>Nombre:</strong> {data.name} {data.surname}
        </p>
        <p>
          <strong>Fecha:</strong> {new Date(data.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Hora:</strong> {data.time}
        </p>
      </div>
    </div>
  );
}
