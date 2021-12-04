import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Pet from "./Pet";
import Result from "./Result";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    console.log("json", json);

    setPets(json.pets);
  }

  const breeds = [];
  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900"
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location:{" "}
          <input
            type="text"
            className="w-60"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal:{" "}
          <select
            className="w-60"
            id="animal"
            value={animal || ""}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
            defaultValue={""}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed:{" "}
          <select
            className="w-60"
            id="breed"
            disabled={!breeds.length}
            value={breed || ""}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
            defaultValue={""}
          >
            <option />
            {breeds.map((breed) => {
              <option key={breed} value={breed}>
                {breed}
              </option>;
            })}
          </select>
        </label>
        <label htmlFor="theme">
          Theme:{" "}
          <select
            className="w-60"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button
          className="rounded px-6 py-2 color text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Result pets={pets} />
    </div>
  );
};
export default SearchParams;
