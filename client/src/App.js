import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import CreateRecipe from './components/CreateRecipe';

function App() {


  return (
    <>
      <Route exact path='/' render={() => <LandingPage />} />
      <Route exact path='/recipes' render={() => <Home />} />
      <Route exact path='/recipes/:id' render={() => <RecipeDetails />} />
      <Route exact path='/createRecipe' render={() => <CreateRecipe />} />
    </>
  );
}

export default App;
