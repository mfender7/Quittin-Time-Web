//
//  AppDelegate.m
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "AppDelegate.h"
#import "MoreChoicesTableViewController.h"

@implementation AppDelegate

@synthesize responseData = _responseData;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    //[defaults setObject:nil forKey:@"foodsToAvoid"];
    //[defaults synchronize];
    //Request Recipes
    self.responseData = [NSMutableData data];
    


    
    
    
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
        UIViewController *vc5 = [storyboard instantiateViewControllerWithIdentifier:@"mealStyleVC"];
        UIViewController *vc4 = [storyboard instantiateViewControllerWithIdentifier:@"userPrefsVC"];
        UIViewController *vc3 = [storyboard instantiateViewControllerWithIdentifier:@"quittinTimeVC"];
        UIViewController *vc2 = [storyboard instantiateViewControllerWithIdentifier:@"allSetVC"];
        MoreChoicesTableViewController *vc1 = [storyboard instantiateViewControllerWithIdentifier:@"menuVC"];
        NSArray *controllers = @[vc1, vc2, vc3,vc4,vc5];
        UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
        [navController setViewControllers:controllers];
        
        // Handle launching from a notification
        UILocalNotification *locationNotification = [launchOptions objectForKey:UIApplicationLaunchOptionsLocalNotificationKey];

        if (locationNotification) {
            // Set icon badge number to zero
            application.applicationIconBadgeNumber = 0;
            [navController popToViewController:vc1 animated:NO];
            UIViewController *rootVC = [navController.viewControllers objectAtIndex:0];
            [rootVC performSegueWithIdentifier:@"selectMeal" sender:self];
        } else {
            [navController popToViewController:vc1 animated:NO];
            
        }
        
    }


    return YES;
}


- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response {
    NSLog(@"didReceiveResponse");
    [self.responseData setLength:0];
}

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
    [self.responseData appendData:data];
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
    NSLog(@"didFailWithError");
    //NSLog([NSString stringWithFormat:@"Connection failed: %@", [error description]]);
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection {
    NSLog(@"connectionDidFinishLoading");
    NSLog(@"Succeeded! Received %d bytes of data",[self.responseData length]);
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:self.responseData options:kNilOptions error:nil];
    [[NSUserDefaults standardUserDefaults] setObject:jsonDict forKey:@"jsonDictionary"];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"NSURLConnectionDidFinish" object:nil];

    //NSDictionary* jsonDict = [NSJSONSerialization JSONObjectWithData:self.responseData options:kNilOptions error:nil];
    
    //    for( NSString *aKey in [jsonDict allKeys] )
    //    {
    //        // do something like a log:
    //        NSLog(aKey);
    //    }
    //
    //    // show all values
//    for(id recipeName in jsonDict) {
//        
//        id value = [jsonDict objectForKey:recipeName];
//        
//        NSString *keyAsString = (NSString *)recipeName;
//        NSString *valueAsString = (NSString *)value;
//        
//        NSLog(@"key: %@", keyAsString);
//        NSLog(@"value: %@", valueAsString);
//    }
    
    // convert to JSON
   // NSError *myError = nil;
    //NSDictionary *res = [NSJSONSerialization JSONObjectWithData:self.responseData options:NSJSONReadingMutableLeaves error:&myError];
    
    //    // show all values
    //    for(id key in res) {
    //
    //        id value = [res objectForKey:key];
    //
    //        NSString *keyAsString = (NSString *)key;
    //        NSString *valueAsString = (NSString *)value;
    //
    //        NSLog(@"key: %@", keyAsString);
    //        NSLog(@"value: %@", valueAsString);
    //    }
    //
    //    // extract specific value...
    //    NSArray *results = [res objectForKey:@"results"];
    //
    //    for (NSDictionary *result in results) {
    //        NSString *icon = [result objectForKey:@"icon"];
    //        NSLog(@"icon: %@", icon);
    //    }
    
}


- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
    UIApplicationState state = [application applicationState];
    if (state == UIApplicationStateActive) {
//        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Reminder"
//                                                        message:notification.alertBody
//                                                       delegate:self cancelButtonTitle:@"OK"
//                                              otherButtonTitles:nil];
//        [alert show];
    }
    
    // Request to reload table view data
    [[NSNotificationCenter defaultCenter] postNotificationName:@"reloadData" object:self];
    
    // Set icon badge number to zero
    //application.applicationIconBadgeNumber = 0;
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
    UINavigationController *navigationController = (UINavigationController *)self.window.rootViewController;
    [navigationController popToRootViewControllerAnimated:NO];

}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.

}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    //NOTE: This will not take foods to avoid into consideration the first time the user sets up the app
    NSMutableArray *foodsToAvoid = [defaults objectForKey:@"foodsToAvoid"];
    NSDate *todaysDate = [[NSDate alloc] init];
    NSDateFormatter *formatterDay = [[NSDateFormatter alloc] init];
    [formatterDay setDateFormat:@"MMddYYYY"];
    //NSString *date = [formatterDay stringFromDate:todaysDate];
    //NSLog(@"%@",date);
    NSLog(@"go go go");
    [self performRequest:foodsToAvoid];
   /*
    if ([(NSString *)[defaults objectForKey:@"dateOfLastLoad"] isEqualToString: nil]) {
        [self performRequest:foodsToAvoid];
        [defaults setObject:date forKey:@"dateOfLastLoad"];
        [defaults synchronize];
        NSLog(@"here");
    } else if ([(NSString *)[defaults objectForKey:@"dateOfLastLoad"] isEqualToString: date]) {
        NSLog(@"nowhere");
    } else {
        [self performRequest:foodsToAvoid];
        [defaults setObject:date forKey:@"dateOfLastLoad"];
        [defaults synchronize];
        NSLog(@"there");
    } */
    
    
    
    
    BOOL firstUse = YES;
    
    if ([defaults objectForKey:@"firstUse"] != nil)
    {
        firstUse = [[defaults objectForKey:@"firstUse"] boolValue];
        
    }

    if (!firstUse)
    {
        UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main_iPhone" bundle:nil];
        UIViewController *vc5 = [storyboard instantiateViewControllerWithIdentifier:@"mealStyleVC"];
        UIViewController *vc4 = [storyboard instantiateViewControllerWithIdentifier:@"userPrefsVC"];
        UIViewController *vc3 = [storyboard instantiateViewControllerWithIdentifier:@"quittinTimeVC"];
        UIViewController *vc2 = [storyboard instantiateViewControllerWithIdentifier:@"allSetVC"];
        MoreChoicesTableViewController *vc1 = [storyboard instantiateViewControllerWithIdentifier:@"menuVC"];
        NSArray *controllers = @[vc1, vc2, vc3,vc4,vc5];
        UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
        [navController setViewControllers:controllers];
        
        if (application.applicationIconBadgeNumber > 0) {
            // Set icon badge number to zero
            application.applicationIconBadgeNumber = 0;
            [navController popToViewController:vc1 animated:NO];
            UIViewController *rootVC = [navController.viewControllers objectAtIndex:0];
            [rootVC performSegueWithIdentifier:@"selectMeal" sender:self];

        } else {
            [navController popToViewController:vc1 animated:NO];
        }
        
    }
    
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (void)performRequest:(NSMutableArray *)foodsToAvoid
    {
    
    NSString *urlString = [NSString stringWithFormat: @"http://80.74.134.201:3000/recipes"];
    if (foodsToAvoid != nil) {
        //for (NSString *item in foodsToAvoid) {
          //  [urlString stringByAppendingString:[NSString stringWithFormat:@"&excluded[]=%@",item]];
        //}
    }
    
    NSURLRequest *request = [NSURLRequest requestWithURL:
                             [NSURL URLWithString:urlString]];
    [[NSURLConnection alloc] initWithRequest:request delegate:self];
}


@end
