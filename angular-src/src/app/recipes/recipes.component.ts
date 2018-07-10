import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // recipe: Recipe;
  // editMode: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // this.recipeService.recipeIsSelected.subscribe(
    //   (recipe: Recipe) => this.recipe = recipe
    // );
    // this.recipeService.editMode.subscribe(
    //   (mode: boolean) => this.editMode = mode
    // );
  }

}
