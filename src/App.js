import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState('');

  const [query, setQuery] = useState('chicken');

  const APP_ID = '689a9ca1';
  const APP_KEY = '55b8d986edfc7b2011a027e5fab5043f';
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  useEffect(() =>{
    getRecipes();
  }, [query]);

  const getRecipes = async() => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className='App'>
      <form onSubmit={getSearch}className='search-form'>
        <input className='search-bar' type="text" name="" value={search} onChange={updateSearch}/>
        <button className='search-button' type="submit">Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe =>(
          <Recipe title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} 
          key={recipe.recipe.label}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
