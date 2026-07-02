const clients = ["Aceros del Perú", "Innova Logística", "Constructora Altamira", "AgroAndes Perú", "Minera Titán", "Global Solutions"];

export function ClientsSection() {
  return (
    <section id="clientes" className="border-y border-line bg-softWhite px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-base font-extrabold text-navy">Empresas que confían en nosotros</h2>
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <div key={client} className="flex items-center justify-center gap-2 grayscale">
              <span className="grid h-10 w-10 place-items-center rounded bg-slate-300 text-lg font-black text-slate-500">
                {client.charAt(0)}
              </span>
              <span className="max-w-28 text-sm font-black uppercase leading-tight text-slate-400">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
