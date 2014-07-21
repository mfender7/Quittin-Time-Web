//
//  RecipeViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "RecipeViewController.h"

@interface RecipeViewController ()

@end

@implementation RecipeViewController{
//    NSDictionary *mealChoices;
//    NSArray *mealNames;
    NSMutableArray *recipe;
}

@synthesize recipeView;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
//    NSURL *url = [[NSBundle mainBundle] URLForResource:@"MealChoices" withExtension:@"plist"];
//    mealChoices = [NSDictionary dictionaryWithContentsOfURL:url];
//    mealNames = mealChoices.allKeys;
    
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    recipe = [userDefaults objectForKey:@"recipe"];
    NSString *recipeText = @"";
    int stepCount = 1;
    for (NSArray *itemArray in recipe) {
        //NSLog(@"%@",[itemArray objectAtIndex:0]);
        recipeText = [recipeText stringByAppendingString:[NSString stringWithFormat:@"%d. ",stepCount]];
        recipeText = [recipeText stringByAppendingString:[itemArray objectAtIndex:0]];
        recipeText = [recipeText stringByAppendingString:@"\n\n"];
        stepCount++;
    }
    
    recipeView.text = recipeText;
//    recipeView.text = @"1 cup Pace® Salsa Verde\n\n2 cups diced cooked chicken\n\n1 large red pepper, diced\n\n1 large avocado, diced\n\n1/2 cup sour cream\n\n4 (10 inch) flour tortillas, warmed\n\n2 cups shredded lettuce\n\n\nStep 1:\nStir 1/2 cup salsa, chicken, pepper and avocado in a large bowl. Stir the remaining salsa and sour cream in a small bowl.\n\nStep 2:\nSpread 1/4 cup sour cream mixture onto each tortilla to within 1/2 inch of the edge. Top each with 1 cup chicken mixture and 1/2 cup lettuce. Fold the sides of the tortillas over the filling and then fold up the ends to enclose the filling. Cut each wrap in half before serving.";
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
