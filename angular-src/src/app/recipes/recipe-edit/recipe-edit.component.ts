import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() changeEditeMode = new EventEmitter<boolean>();
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let recipeName = this.recipe.title;;
    let recipeImagePath = this.recipe.imagePath;
    let recipeDescription = this.recipe.description;

    this.recipeForm = new FormGroup({
      'title': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required)
    });
  }

  onSubmit() {
    this.recipe.title = this.recipeForm.value.title;
    this.recipe.imagePath = this.recipeForm.value.imagePath;
    this.recipe.description = this.recipeForm.value.description;
    this.recipeService.updateRecipe(this.recipe).subscribe();
    this.onCancel();
  }

  onCancel() {
    this.changeEditeMode.emit(false);
  }

}
