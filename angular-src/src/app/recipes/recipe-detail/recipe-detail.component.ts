import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  editMode = false;

  constructor(public recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.recipeService.recipeIsSelected.subscribe(
      (recipe: Recipe) => this.recipe = recipe
    );
  }

  onChangeMode(mode: boolean) {
    this.editMode = mode;
  }

  onEditRecipe() {
    this.editMode = true;
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe);
    this.recipe = null;
  }

}
