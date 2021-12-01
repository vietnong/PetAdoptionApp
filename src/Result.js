import Pet from "./Pet";
const Result = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pet found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
              key={pet.id}
            ></Pet>
          );
        })
      )}
    </div>
  );
};

export default Result;
