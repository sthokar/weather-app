import "./App.css";
import Search from "./components/search/Search";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log("Hi");
  };
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;
