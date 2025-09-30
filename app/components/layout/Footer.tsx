'use client';

const Footer = () => {
  const team = {
    frontend: [
      "HouleyD-oumar",
      "ibrahim-sempy",
      "siradio1diallo",
      "IDIATOUTOURE",
      "Layla023"
    ],
    backend: ["kante","and others"],
    supervisor: "Kabinet48"
  };

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend Devs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Développeurs Frontend</h3>
            <ul className="space-y-2">
              {team.frontend.map((dev) => (
                <li key={dev} className="text-gray-300 hover:text-white transition-colors">
                  {dev}
                </li>
              ))}
            </ul>
          </div>

          {/* Backend Devs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Développeurs Backend</h3>
            <ul className="space-y-2">
              {team.backend.map((dev) => (
                <li key={dev} className="text-gray-300 hover:text-white transition-colors">
                  {dev}
                </li>
              ))}
            </ul>
          </div>

          {/* Supervisor */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Superviseur</h3>
            <p className="text-gray-300">{team.supervisor}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Gestion de Contacts. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;