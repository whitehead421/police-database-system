import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Wanted from "../../components/wanted/Wanted";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const { data: wanteds, reFetch } = useFetch("/api/wanteds/type/3");
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="wanteds">
          {wanteds
            .slice(0)
            .reverse()
            .map((w) => (
              <Wanted key={w._id} wanted={w} reFetch={reFetch} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
