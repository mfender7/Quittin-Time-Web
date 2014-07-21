//
//  GroceryListViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "GroceryListViewController.h"
#import "IngredientTableViewCell.h"

@interface GroceryListViewController ()


@end

@implementation GroceryListViewController{
    //NSDictionary *mealChoices;
    NSArray *mealName;
    NSDictionary *ingredientsDict;
    NSMutableArray *groceryList;
}

@synthesize selectedIngredients;



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
    //NSURL *url = [[NSBundle mainBundle] URLForResource:@"MealChoices" withExtension:@"plist"];
    //mealChoices = [NSDictionary dictionaryWithContentsOfURL:url];
    //mealNames = mealChoices.allKeys;
    
    
    
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    groceryList = [userDefaults objectForKey:@"groceryList"];
    



    //ingredientsList = [NSArray arrayWithObjects:@"Liver", @"Lima Beans", @"Mushrooms", @"Eggs", @"Okra", @"Tuna Fish", @"Beets", @"Brussel Sprouts", @"Olives", @"Raisins", @"Onions", @"Blue Cheese", @"Peas",nil];
    
    if (selectedIngredients == nil) {
        selectedIngredients = [[NSMutableArray alloc] init];
    }
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
    return groceryList.count;
}

//- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section{
//    NSString *sectionName;
//    switch (section)
//    {
//        case 0:
//            sectionName = @"Grocery List:";
//            break;
//        default:
//            sectionName = @"";
//            break;
//    }
//    return sectionName;
//}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    IngredientTableViewCell *cell = (IngredientTableViewCell *)[tableView dequeueReusableCellWithIdentifier:@"IngredientsCell"];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"IngredientsCell" owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }

    
    NSNumber *rowNsNum = [NSNumber numberWithUnsignedInt:indexPath.row];
    if ( [selectedIngredients containsObject:rowNsNum]  )
    {
        //cell.accessoryType = UITableViewCellAccessoryCheckmark;
        cell.checkbox.image = [UIImage imageNamed:@"checkbox_checked"];
        cell.strikethrough.hidden = NO;
        cell.ingredientName.textColor = [UIColor lightGrayColor];
    }
    else
    {
        //cell.accessoryType = UITableViewCellAccessoryNone;
        cell.checkbox.image = [UIImage imageNamed:@"checkbox"];
        cell.strikethrough.hidden = YES;
        cell.ingredientName.textColor = [UIColor blackColor];
    }
    
    // Configure the cell...
    cell.ingredientName.text = [groceryList objectAtIndex: indexPath.row];
    
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:[tableView indexPathForSelectedRow] animated:NO];
    IngredientTableViewCell *cell = (IngredientTableViewCell *)[tableView cellForRowAtIndexPath:indexPath];
    NSNumber *rowNsNum = [NSNumber numberWithUnsignedInt:indexPath.row];
    if (cell.strikethrough.hidden) {
        cell.checkbox.image = [UIImage imageNamed:@"checkbox_checked"];
        cell.strikethrough.hidden = NO;
        cell.ingredientName.textColor = [UIColor lightGrayColor];
        [selectedIngredients addObject:rowNsNum];
        // Reflect selection in data model
    } else if (!cell.strikethrough.hidden) {
        cell.checkbox.image = [UIImage imageNamed:@"checkbox"];
        cell.strikethrough.hidden = YES;
        cell.ingredientName.textColor = [UIColor blackColor];
        [selectedIngredients removeObject:rowNsNum];
        // Reflect deselection in data model
    }
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
