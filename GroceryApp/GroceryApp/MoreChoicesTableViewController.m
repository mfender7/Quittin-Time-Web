//
//  MoreChoicesTableViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "MoreChoicesTableViewController.h"
#import "MealChoiceTableViewCell.h"
#import "AppDelegate.h"
#import "GroceryListRecipeViewController.h"

@interface MoreChoicesTableViewController () {
    NSMutableArray *imageArray;
}

@end


@implementation MoreChoicesTableViewController {
    NSDictionary *mealChoices;
    NSMutableArray *mealNames;
    NSDictionary *jsonDict;
    AppDelegate *appDelegate;
}



- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
    appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    NSMutableArray *foodsToAvoid = [userDefaults objectForKey:@"foodToAvoid"];
    [appDelegate performRequest:foodsToAvoid];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(reloadData)
                                                 name:@"NSURLConnectionDidFinish"
                                               object:nil];
    
    mealNames = [[NSMutableArray alloc] init];
    imageArray = [[NSMutableArray alloc] init];


    
    //mealNames = [NSArray arrayWithObjects:@"Salsa Verde Chicken Wraps", @"Sweet Apple Chicken Sausage Kabobs",@"Thai Chicken Tenders", nil];
    //imageArray =  [NSArray arrayWithObjects:@"ChickenWraps.png",@"ChickenKabobs.jpg",@"ThaiChickenTenders.jpg",nil];
    
}

-(void) reloadData {
    // finish up
    NSLog(@"here");
    // convert to JSON
    //NSString *filePath = [[NSBundle mainBundle] pathForResource:@"sampleJSON" ofType:@"json"];
    //NSData* data = [NSData dataWithContentsOfFile:filePath];
    //NSDictionary* jsonDict = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
    jsonDict = [NSJSONSerialization JSONObjectWithData:appDelegate.responseData options:kNilOptions error:nil];
    
    //    for( NSString *aKey in [jsonDict allKeys] )
    //    {
    //        // do something like a log:
    //        NSLog(aKey);
    //    }
    //
    //    // show all values
    for(id recipeName in jsonDict) {
        
        id value = [jsonDict objectForKey:recipeName];
        
        NSString *keyAsString = (NSString *)recipeName;
        NSString *valueAsString = (NSString *)value;
        
        NSLog(@"key: %@", keyAsString);
        NSLog(@"value: %@", valueAsString);
    }
    
    // extract specific value...
    NSArray *results = [jsonDict objectForKey:@"matches"];
    int recipeCount = 0;
    for (NSDictionary *result in results) {
        if (recipeCount < 3) {
            NSString *recipeName = [result objectForKey:@"recipeName"];
            [mealNames addObject:recipeName];
            NSLog(@"Recipe Name: %@", recipeName);
            
            NSDictionary *totalPath = [result objectForKey:@"images"];
            NSString *path = [totalPath objectForKey:@"smallUrl"];
            NSURL *url = [NSURL URLWithString:path];
            NSData *data = [NSData dataWithContentsOfURL:url];
            UIImage *recipeImage = [[UIImage alloc] initWithData:data];
            [imageArray addObject:recipeImage];
            NSLog(@"Path: %@", path);
            
            recipeCount++;
        }
        
    }
    [self.tableView reloadData];
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return mealNames.count;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return 1;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    MealChoiceTableViewCell *cell = (MealChoiceTableViewCell *)[tableView dequeueReusableCellWithIdentifier:@"MealChoiceCell"];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"MealChoiceCell" owner:self options:nil];
        cell = [nib objectAtIndex:0];
    }
    
    // Configure the cell...
    cell.mealImage.image = [imageArray objectAtIndex:indexPath.section];
    NSString *mealName = [mealNames objectAtIndex: indexPath.section];
    cell.mealLabel.text = mealName;
    
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{

}



#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([[segue identifier] isEqualToString:@"selectMeal"])
    {
        // Get reference to the destination view controller
        GroceryListRecipeViewController *vc = [segue destinationViewController];
        
        //Get Recipe and Directions
        NSArray *results = [jsonDict objectForKey:@"matches"];

        for (NSDictionary *result in results) {
            NSString *recipeName = [result objectForKey:@"recipeName"];
            
            NSMutableArray *groceryList = [[NSMutableArray alloc] init];
            NSMutableArray *recipe = [[NSMutableArray alloc] init];
                for (NSString* item in mealNames) {
                    if ([item isEqualToString:recipeName]) {
                        [groceryList addObject: [result objectForKey:@"ingredients"]];
                        [recipe addObject: [result objectForKey:@"directions"]];
                        for (NSString *item in groceryList){
                            NSLog(@"%@",item);
                        }
                    }
                }
            NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
            [userDefaults setObject:groceryList forKey:@"groceryList"];
            [userDefaults setObject:recipe forKey:@"recipe"];
            [userDefaults synchronize];
            return;
        }
    }
}


/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/

/*
// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the row from the data source
        [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
    } else if (editingStyle == UITableViewCellEditingStyleInsert) {
        // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
    }   
}
*/

/*
// Override to support rearranging the table view.
- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath
{
}
*/

/*
// Override to support conditional rearranging of the table view.
- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Return NO if you do not want the item to be re-orderable.
    return YES;
}
*/

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

