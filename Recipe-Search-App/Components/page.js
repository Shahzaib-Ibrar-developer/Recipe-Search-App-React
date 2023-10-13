"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeData, setRecipeData] = useState(null);
const [RandomQuery, setRandomQuery] = useState("")
  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2',
      params: {
        type: 'public',
        q: searchQuery,
        co2EmissionsClass: 'A+',
        'field[0]': 'uri',
        beta: 'true',
        // random: 'true',
        // 'cuisineType[0]': 'American',
        // 'imageSize[0]': 'LARGE',
        // 'mealType[0]': 'Breakfast',
        // 'health[0]': 'alcohol-cocktail',
        // 'diet[0]': 'balanced',
        // 'dishType[0]': 'Biscuits and cookies',
      },
      headers: {
        'Accept-Language': 'en',
        'X-RapidAPI-Key': '5ea0dc9b1dmsh99f39c25cbced79p1a975djsn7525e530690b',
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      // Update the recipeData state with the API response
      setRecipeData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setRandomQuery("Meat")
    fetchData();
  }, [RandomQuery, searchQuery]);

  return (
    <div>
      <AppBar color='secondary' position="static">
        <Container>
          <Typography fontSize={25} variant="h6">Recipe Search</Typography>
          <TextField
         className='Search'
            label="Search for recipes"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={fetchData}>
            Search
          </Button>
        </Container>
      </AppBar>
      <Container>
        {recipeData && (
          <div>
            <h2>Recipes</h2>
            <div className="recipe-list">
              {recipeData.hits.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <img  className='grid-items' src={recipe.recipe.image} alt={recipe.recipe.label} />
                  <h3 className='grid-items'>{recipe.recipe.label}</h3>
                  <h2 className='grid-items'>Ingredients:</h2>
                  <ul className='grid-items'>
                    {recipe.recipe.ingredientLines.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Page;
