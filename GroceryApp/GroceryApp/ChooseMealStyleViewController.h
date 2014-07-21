//
//  ChooseMealStyleViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/30/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ChooseMealStyleViewController : UIViewController <UICollectionViewDataSource, UICollectionViewDelegate>
@property (weak, nonatomic) IBOutlet UICollectionView *myCollectionView;

@end
