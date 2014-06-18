//
//  UsernameViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/17/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UsernameViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextField *username;
@property (weak, nonatomic) IBOutlet UITextField *password;
@property (weak, nonatomic) IBOutlet UIImageView *usernameCheck;
@property (weak, nonatomic) IBOutlet UIImageView *passwordCheck;

@end
