//
//  GroceryListViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "GroceryListViewController.h"

@interface GroceryListViewController ()


@end

@implementation GroceryListViewController{
    NSDictionary *mealChoices;
    NSArray *mealNames;
    NSDictionary *ingredientsDict;
    NSArray *ingredientsList;
}


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
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"MealChoices" withExtension:@"plist"];
    mealChoices = [NSDictionary dictionaryWithContentsOfURL:url];
    mealNames = mealChoices.allKeys;
    
    NSURL *url2 = [[NSBundle mainBundle] URLForResource:@"Ingredients" withExtension:@"plist"];
    ingredientsDict = [NSDictionary dictionaryWithContentsOfURL:url2];
    ingredientsList = ingredientsDict.allKeys;
    
    
    
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
    return ingredientsList.count;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section{
    NSString *sectionName;
    switch (section)
    {
        case 0:
            sectionName = @"Grocery List:";
            break;
        default:
            sectionName = @"";
            break;
    }
    return sectionName;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"IngredientsCell"];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"IngredientsCell" owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }
    //NSArray *ingredients = [[NSArray alloc] initWithArray:mealNames];
    
    
    
    // Configure the cell...
    cell.textLabel.text = [ingredientsDict objectForKey:ingredientsList[indexPath.row]];
    
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
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
