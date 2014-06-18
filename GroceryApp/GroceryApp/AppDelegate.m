//
//  AppDelegate.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "AppDelegate.h"
#import "GroceryListRecipeViewController.h"

@implementation AppDelegate



- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    BOOL firstUse = YES;
    
    if ([defaults objectForKey:@"firstUse"] != nil)
    {
        firstUse = [[defaults objectForKey:@"firstUse"] boolValue];
        
    }
    else
    {
        [defaults setObject:[NSNumber numberWithBool:YES] forKey:@"firstUse"];
        [defaults synchronize];
    }


    if (!firstUse)
    {
        UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil];
        UIViewController *vc4 = [storyboard instantiateViewControllerWithIdentifier:@"mealStyleVC"];
        UIViewController *vc3 = [storyboard instantiateViewControllerWithIdentifier:@"userPrefsVC"];
        UIViewController *vc2 = [storyboard instantiateViewControllerWithIdentifier:@"usernameVC"];
        GroceryListRecipeViewController *vc1 = [storyboard instantiateViewControllerWithIdentifier:@"SteadyState"];
        NSArray *controllers = @[vc1, vc2, vc3,vc4];
        UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
        [navController setViewControllers:controllers];
        [navController popToViewController:vc1 animated:NO];
    }


    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
