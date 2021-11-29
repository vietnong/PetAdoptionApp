import { render } from "react-dom";
import Pet from "./Pet";
import SearchParams from "./SearchParams";

export const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
      {/* <Pet name={"Luna"} animal={"Dog"} breed={"Havanese"}></Pet>
      <Pet name={"Pepper"} animal={"Bird"} breed={"Cockatiel"}></Pet>
      <Pet name={"Doink"} animal={"Cat"} breed={"Mix ahihi"}></Pet> */}
    </div>
  );
};

render(<App />, document.getElementById("root"));
