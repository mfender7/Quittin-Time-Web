//
//  ChooseMealStyleViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/30/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "ChooseMealStyleViewController.h"
#import "MealStyleCollectionViewCell.h"

@interface ChooseMealStyleViewController () {
    NSArray *imageArray;
}

@end

@implementation ChooseMealStyleViewController

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
    imageArray =  [NSArray arrayWithObjects:@"Classic Meals.png", @"Clean Eating.png", @"Paleo.png", @"Low Calorie.png", @"Slow Cooker.png", @"Low Fat.png", @"Low Carb.png", @"Kid Friendly.png",nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    
    return 1;
}

-(NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    
    return 8;
    
}

-(UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    MealStyleCollectionViewCell   *cell = (MealStyleCollectionViewCell *)[collectionView dequeueReusableCellWithReuseIdentifier:@"cell" forIndexPath:indexPath];
    
    if (cell.selected) {
        cell.backgroundColor = [UIColor orangeColor]; // highlight selection
    }
    else
    {
        cell.backgroundColor = [UIColor clearColor]; // Default color
    }
    
    //cell.imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:[imageArray objectAtIndex:indexPath.row]]];
    cell.imageView.image = [UIImage imageNamed:[imageArray objectAtIndex:indexPath.row]];
    
    return cell;
    
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath{
    UICollectionViewCell* cell = [collectionView  cellForItemAtIndexPath:indexPath];
    cell.backgroundColor = [UIColor orangeColor]; //     //cell.lblImgTitle.text = @"xxx";
}

- (void)collectionView:(UICollectionView *)collectionView didDeselectItemAtIndexPath:(NSIndexPath *)indexPath{
    UICollectionViewCell* cell = [collectionView  cellForItemAtIndexPath:indexPath];
    cell.backgroundColor = [UIColor clearColor];
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
