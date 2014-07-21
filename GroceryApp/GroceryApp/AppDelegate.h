//
//  AppDelegate.h
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (weak,nonatomic) UINavigationController *navigationController;
@property (nonatomic, strong) NSMutableData *responseData;

- (void)performRequest:(NSMutableArray *)foodsToAvoid;

@end
