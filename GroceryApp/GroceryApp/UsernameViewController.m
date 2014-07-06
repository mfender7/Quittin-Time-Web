//
//  UsernameViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/17/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "UsernameViewController.h"
#import "GroceryListRecipeViewController.h"

@interface UsernameViewController ()

@end

@implementation UsernameViewController

@synthesize username;
@synthesize password;
@synthesize usernameCheck;
@synthesize passwordCheck;

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
    usernameCheck.hidden = YES;
    passwordCheck.hidden = YES;
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

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
        // Make sure your segue name in storyboard is the same as this line


}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    [textField resignFirstResponder];
    return NO;
}


- (IBAction)usernameChanged:(id)sender {
    usernameCheck.hidden = NO;
    
}

- (IBAction)passwordChanged:(id)sender {
    passwordCheck.hidden = NO;
}

- (IBAction)usernameSelected:(id)sender {
    username.text = @"";
}

- (IBAction)passwordSelected:(id)sender {
    password.text = @"";
    password.secureTextEntry = YES;
}

- (IBAction)gotoGroceryList:(id)sender {
        if (usernameCheck.isHidden == NO && passwordCheck.isHidden == NO) {
            [self performSegueWithIdentifier:@"gotoGroceryList" sender:nil];
        }
}
@end
