//
//  UsernameViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/17/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UsernameViewController : UIViewController <UITextFieldDelegate>

@property (weak, nonatomic) IBOutlet UITextField *username;
@property (weak, nonatomic) IBOutlet UITextField *password;
@property (weak, nonatomic) IBOutlet UIImageView *usernameCheck;
@property (weak, nonatomic) IBOutlet UIImageView *passwordCheck;
- (IBAction)usernameChanged:(id)sender;
- (IBAction)passwordChanged:(id)sender;
- (IBAction)usernameSelected:(id)sender;
- (IBAction)passwordSelected:(id)sender;
- (IBAction)gotoGroceryList:(id)sender;

@end
