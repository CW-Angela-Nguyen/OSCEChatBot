
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">PharmBot OSCE Simulator</h1>
      <p className="mb-4">Practice realistic OSCE cases as an intern pharmacist in NZ.</p>
      <Link to="/select" className="bg-blue-500 text-white px-4 py-2 rounded">
        Start New Case
      </Link>
    </div>
  );
}

export default Home;
