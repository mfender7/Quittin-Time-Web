//
//  AllSetViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/29/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "AllSetViewController.h"

@interface AllSetViewController ()

@end

@implementation AllSetViewController

@synthesize timeLabel;
@synthesize timeLabelText;

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
    timeLabel.text = timeLabelText;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([[segue identifier] isEqualToString:@"gotoMenu"])
    {
        // Get reference to the destination view controller
        //GroceryListRecipeViewController *groceryListVC = [segue destinationViewController];
        
        // Pass any objects to the view controller here, like...
        //[groceryListVC isFirstUse];
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        [defaults setObject:[NSNumber numberWithBool:NO] forKey:@"firstUse"];
        [defaults synchronize];
    }
}


@end
