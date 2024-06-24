interface Props {
  onSearch: (e: string) => void;
  items: string[];
  onSelectType: (e: string) => void;
}

const Navbar = ({ onSearch, items, onSelectType }: Props) => {
  function handleState(e: string) {
    onSelectType(e);
  }
  function clearInputs() {
    onSelectType("All");
    onSearch("");
  }

  return (
    <nav className="navbar--container">
      <h1>Pokemon Stats Viewer</h1>
      <div className="navbar--search">
        <div className="navbar--search--item">
          <label htmlFor="pokemonName">Filter Pokemon Type: </label>
          <select onChange={(e) => handleState(e.target.value)}>
            <option defaultValue="All" value="All">
              All
            </option>
            {items.map((item: string) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="navbar--search--item">
          <label htmlFor="pokemonName">Search Pokmeon: </label>
          <input
            type="text"
            name="pokemonName"
            onChange={(e) => {
              console.log(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Find Pokemon"
          />
        </div>
        <div className="navbar--search--item">
          <button onClick={clearInputs}>Clear</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
