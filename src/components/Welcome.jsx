import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function Welcome() {
    const auth = useAuth();

    return (
      <>
        <h1>Welcome {auth.username}</h1>
        <div>
          Your todos <Link to="/todos">Go here</Link>
        </div>
      </> 
    );
}