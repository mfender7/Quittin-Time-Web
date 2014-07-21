//
//  FoodsToAvoidViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/30/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "FoodsToAvoidViewController.h"

@interface FoodsToAvoidViewController () {
    NSArray *avoidedFoods;
    NSArray *avoidedFoodsSorted;
    NSMutableArray *selectedFoods;
}
@end

@implementation FoodsToAvoidViewController

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
    avoidedFoods = [NSArray arrayWithObjects:@"Liver", @"Lima Beans", @"Mushrooms", @"Eggs", @"Okra", @"Tuna Fish", @"Beets", @"Brussel Sprouts", @"Olives", @"Raisins", @"Onions", @"Blue Cheese", @"Peas",nil];
    avoidedFoodsSorted = [avoidedFoods sortedArrayUsingSelector:@selector(localizedCaseInsensitiveCompare:)];
    selectedFoods = [[NSMutableArray alloc] init];
    
    
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return avoidedFoods.count;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"hatedFoodsCell"];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"hatedFoodsCell" owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }
    
    NSNumber *rowNsNum = [NSNumber numberWithUnsignedInt:indexPath.row];
    if ( [selectedFoods containsObject:rowNsNum]  )
    {
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
    }
    else
    {
        cell.accessoryType = UITableViewCellAccessoryNone;
    }
    
    // Configure the cell...
    cell.textLabel.text = [avoidedFoodsSorted objectAtIndex:indexPath.row];

    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:[tableView indexPathForSelectedRow] animated:NO];
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    NSNumber *rowNsNum = [NSNumber numberWithUnsignedInt:indexPath.row];
    if (cell.accessoryType == UITableViewCellAccessoryNone) {
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
        [selectedFoods addObject:rowNsNum];
        // Reflect selection in data model
    } else if (cell.accessoryType == UITableViewCellAccessoryCheckmark) {
        cell.accessoryType = UITableViewCellAccessoryNone;
        [selectedFoods removeObject:rowNsNum];
        // Reflect deselection in data model
    }
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
    if ([[segue identifier] isEqualToString:@"gotoTimeSelect"])
    {
        NSMutableArray *foodsToAvoid = [[NSMutableArray alloc] init];
        for (NSNumber *row in selectedFoods) {
            NSInteger rowInteger = [row integerValue];
            [foodsToAvoid addObject:[avoidedFoodsSorted objectAtIndex:rowInteger]];
        }
        NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
        [userDefaults setObject:foodsToAvoid forKey:@"foodsToAvoid"];
        [userDefaults synchronize];
        
    }
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
