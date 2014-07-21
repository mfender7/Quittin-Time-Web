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
    //NSDictionary *mealChoices;
    //NSArray *mealNames;
    BOOL viewIsGroceryList;

}

@synthesize mealTitle;
@synthesize viewSelect;
@synthesize recipeImage;



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
//    NSURL *url = [[NSBundle mainBundle] URLForResource:@"MealChoices" withExtension:@"plist"];
//    mealChoices = [NSDictionary dictionaryWithContentsOfURL:url];
//    mealNames = mealChoices.allKeys;
//    mealTitle.text = mealNames[1];
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    mealTitle.text = [userDefaults objectForKey:@"recipeName"];
    
    NSString *path = [userDefaults objectForKey:@"recipeImage"];
    NSURL *url = [NSURL URLWithString:path];
    NSData *data = [NSData dataWithContentsOfURL:url];
    recipeImage.image = [[UIImage alloc] initWithData:data];

    viewIsGroceryList = YES;
    
    //Change Segmented Control Font Size
    UIFont *font = [UIFont boldSystemFontOfSize:18.0f];
    NSDictionary *attributes = [NSDictionary dictionaryWithObject:font
                                                           forKey:NSFontAttributeName];
    [viewSelect setTitleTextAttributes:attributes
                                    forState:UIControlStateNormal];
    
    
    [viewSelect addTarget:self
                         action:@selector(changeView:)
               forControlEvents:UIControlEventValueChanged];

    
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


- (void)changeView:(id)sender {
    if (!viewIsGroceryList) {
        [self.containerViewController showGroceryListViewController];
        viewIsGroceryList = YES;
    } else if (viewIsGroceryList) {
            [self.containerViewController showRecipeViewController];
            viewIsGroceryList = NO;
    }
}
@end
