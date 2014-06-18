//
//  GroceryListRecipeViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "GroceryListRecipeViewController.h"
#import "ContainerViewController.h"


@interface GroceryListRecipeViewController ()
@property (nonatomic, weak) ContainerViewController *containerViewController;
@end


@implementation GroceryListRecipeViewController{
    NSDictionary *mealChoices;
    NSArray *mealNames;
    BOOL viewIsGroceryList;
}

@synthesize mealTitle;
@synthesize tutorialText;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (BOOL)shouldPerformSegueWithIdentifier:(NSString *)identifier sender:(id)sender
{

    
    return YES;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    
    if ([segue.identifier isEqualToString:@"embedContainer"]) {
        self.containerViewController = segue.destinationViewController;
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"MealChoices" withExtension:@"plist"];
    mealChoices = [NSDictionary dictionaryWithContentsOfURL:url];
    mealNames = mealChoices.allKeys;
    mealTitle.text = mealNames[1];
    viewIsGroceryList = YES;
    [self.navigationItem setHidesBackButton:YES animated:YES];
    
    UISwipeGestureRecognizer * Swiperight=[[UISwipeGestureRecognizer alloc]initWithTarget:self action:@selector(swiperight:)];
    Swiperight.direction=UISwipeGestureRecognizerDirectionRight;
    [self.view addGestureRecognizer:Swiperight];
    
    UISwipeGestureRecognizer * Swipeleft=[[UISwipeGestureRecognizer alloc]initWithTarget:self action:@selector(swipeleft:)];
    Swipeleft.direction=UISwipeGestureRecognizerDirectionLeft;
    [self.view addGestureRecognizer:Swipeleft];
}

-(void)swipeleft:(UISwipeGestureRecognizer*)gestureRecognizer
{
    //Do what you want here
    if (viewIsGroceryList) {
        UIView *viewToRemove = [self.view viewWithTag:99];
        [UIView animateWithDuration:0.3
                         animations:^{viewToRemove.alpha = 0.0;}
                         completion:^(BOOL finished){ [viewToRemove removeFromSuperview]; }];
        [self.containerViewController showRecipeViewController];
        viewIsGroceryList = NO;
    }

    
}

-(void)swiperight:(UISwipeGestureRecognizer*)gestureRecognizer
{
    //Do what you want here
    if (!viewIsGroceryList) {
        UIView *viewToRemove = [self.view viewWithTag:99];
        [UIView animateWithDuration:0.3
                         animations:^{viewToRemove.alpha = 0.0;}
                         completion:^(BOOL finished){ [viewToRemove removeFromSuperview]; }];
        [self.containerViewController showGroceryListViewController];
        viewIsGroceryList = YES;
    }

    
    
    //      [[UIViewController alloc] initWithNibName:@"QueryController1" bundle:nil];
    
    
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
