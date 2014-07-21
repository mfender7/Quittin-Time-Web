//
//  QuittinTimeViewController.m
//  GroceryApp
//
//  Created by Shane Owens on 6/30/14.
//  Copyright (c) 2014 Shane Owens. All rights reserved.
//

#import "QuittinTimeViewController.h"
#import "AllSetViewController.h"

@interface QuittinTimeViewController ()

@property (weak, nonatomic) IBOutlet UIDatePicker *datePicker;
@end

@implementation QuittinTimeViewController

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
    if ([[segue identifier] isEqualToString:@"gotoAllSet"])
    {
        //Set Date and Time to be Displayed on the Next Screen
        NSDate *chosen = [self.datePicker date];
        NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
        [formatter setDateFormat:@"h:mm a"];
        NSString *time = [formatter stringFromDate:chosen];
        
        NSDate *now = [NSDate date];
        NSDateFormatter *formatterDay = [[NSDateFormatter alloc] init];
        [formatterDay setDateFormat:@"EEEE"];
        
        
        unsigned int flags = NSHourCalendarUnit | NSMinuteCalendarUnit | NSSecondCalendarUnit;
        NSCalendar* calendar = [NSCalendar currentCalendar];
        
        NSDateComponents* chosenTime = [calendar components:flags fromDate:chosen];
        NSDateComponents* nowTime = [calendar components:flags fromDate:now];
        
        NSDate* chosenTimeOnly = [calendar dateFromComponents:chosenTime];
        NSDate* nowTimeOnly = [calendar dateFromComponents:nowTime];
        
        NSComparisonResult result = [chosenTimeOnly compare:nowTimeOnly];
        
        
        if(result == NSOrderedAscending)
        {
            //NSLog(@"now is later than chosen");
            now = [now dateByAddingTimeInterval:60*60*24]; //add 1 Day
        }
        
        NSString *weekday = [formatterDay stringFromDate:now];

        
        if ([weekday isEqualToString:@"Friday"]) {

            if(result == NSOrderedDescending)
            {
                //NSLog(@"chosen is later than now");
            }
            else if(result == NSOrderedAscending)
            {
                //NSLog(@"now is later than chosen");
                weekday = @"Monday";
            }
            else
            {
                //NSLog(@"chosen is equal to now");
                weekday = @"Monday";
            }
        } else if ([weekday isEqualToString:@"Saturday"] || [weekday isEqualToString:@"Sunday"]) {
            weekday = @"Monday";
        }

        
        // Get reference to the destination view controller
        AllSetViewController *allSetVC = [segue destinationViewController];
        
        // Pass any objects to the view controller here, like...
        allSetVC.timeLabelText = [[NSString alloc] initWithFormat: @"%@ at %@", weekday, time];

    

    }
}


@end
