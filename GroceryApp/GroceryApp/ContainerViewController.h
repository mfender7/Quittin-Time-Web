//
//  ContainerViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ContainerViewController : UIViewController

- (void)showGroceryListViewController;
- (void)showRecipeViewController;

@property (weak, nonatomic) NSArray *groceryList;
@property (weak, nonatomic) NSArray *recipe;

@end
