//
//  SettingsViewController.h
//  GroceryApp
//
//  Created by Shane Owens on 6/7/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SettingsViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>

- (IBAction)restart:(id)sender;

- (IBAction)triggerNotification:(id)sender;

@end
