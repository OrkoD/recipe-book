import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs/index';
import {Recipe} from './recipe.model';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class RecipeService {
  recipeIsSelected = new Subject<Recipe>();
  recipes: Recipe[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  selectedRecipe(recipe: Recipe) {
    this.recipeIsSelected.next(recipe);
  }

  getRecipes(): Observable<Recipe[]> {
    // return this.http.get('http://localhost:3000/api/recipe', this.httpOptions)
    return this.http.get('api/recipe', this.httpOptions)
      .pipe(
        map(
          (response: any) => {
            const recipes: Recipe[] = [];
            for (let recipe of response.recipes) {
              recipes.push(new Recipe(
                recipe.title,
                recipe.description,
                recipe.imagePath,
                recipe.date,
                recipe._id
              ));
            }
            this.recipes = recipes;
            return recipes;
          }
        )
      );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    // return this.http.post('http://localhost:3000/api/recipe', recipe, this.httpOptions)
    return this.http.post('api/recipe', recipe, this.httpOptions)
      .pipe(map(
        (response: any) => {
          const recipe = new Recipe(
            response.recipe.title,
            response.recipe.description,
            response.recipe.imagePath,
            response.recipe.date,
            response.recipe._id
          );
          this.recipes.push(recipe);
          return recipe;
        }
      ));
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    // return this.http.patch('http://localhost:3000/api/recipe/' + recipe.id, recipe, this.httpOptions)
    return this.http.patch('api/recipe/' + recipe.id, recipe, this.httpOptions)
      .pipe(map(
        (response: any) => {
          const recipe = new Recipe(
            response.recipe.title,
            response.recipe.description,
            response.recipe.imagePath,
            response.recipe.date,
            response.recipe._id
          );
          return recipe;
        }
      ));
  }

  deleteRecipe(recipe: Recipe) {
    // return this.http.delete('http://localhost:3000/api/recipe/' + recipe.id, this.httpOptions)
    return this.http.delete('api/recipe/' + recipe.id, this.httpOptions)
      .subscribe(
        res => this.recipes.splice(this.recipes.indexOf(recipe), 1)
      );
  }


}
