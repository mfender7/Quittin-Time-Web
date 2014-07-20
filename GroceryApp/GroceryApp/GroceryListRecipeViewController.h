//
//  GroceryListRecipeViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface GroceryListRecipeViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextView *mealTitle;
@property (weak, nonatomic) IBOutlet UISegmentedControl *viewSelect;

@property (weak, nonatomic) IBOutlet UIImageView *recipeImage;


@end
