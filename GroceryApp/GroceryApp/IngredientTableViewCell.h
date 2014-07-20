//
//  IngredientTableViewCell.h
//  GroceryApp
//
//  Created by Shane Owens on 7/19/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface IngredientTableViewCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel *strikethrough;
@property (weak, nonatomic) IBOutlet UIImageView *checkbox;
@property (weak, nonatomic) IBOutlet UILabel *ingredientName;


@end
