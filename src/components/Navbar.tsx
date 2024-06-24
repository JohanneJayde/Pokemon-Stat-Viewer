const Navbar = ({ onSearch }: { onSearch: (e: string) => void }) => {
  return (
    <nav className="navbar--container">
      <h1>Pokemon Stats Viewer</h1>
      <div className="navbar--container--search">
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
    </nav>
  );
};

export default Navbar;
