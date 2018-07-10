export class Recipe {
  constructor(
    public title: string,
    public description: string,
    public imagePath: string,
    public date: Date,
    public id?: string
  ) {}
}
