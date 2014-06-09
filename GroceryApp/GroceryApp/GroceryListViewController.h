//
//  GroceryListViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface GroceryListViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>
@property (weak, nonatomic) IBOutlet UITextView *mealTitle;

@end