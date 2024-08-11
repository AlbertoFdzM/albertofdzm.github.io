---
title: Clean Google Analytics Metrics
date: 2017-08-30
lastmod: 2024-08-11
tags:
  - Google Analytics
---

<!--kg-card-begin: markdown-->

So here is what happened. I went to my analytics panel and I checked my monthly visits. What did I saw?

![Monthly Google Analytics Graph](/old-posts-images/2017/08/Monthly_Analytics.PNG)

That peak annoyed me, so I decided to investigate it.

## Find Analytics Anomaly with Filters

What I do to **identify why I have that peak in analytics** is by trying to isolate it using analytics dynamic filters.

### Filter by Date

First by isolating the date. If this is not the case there are more ways to isolate it that I will expose later.

![One Day Analytics Graph](/old-posts-images/2017/08/One_Day_Analytics_Graph.PNG)\
_There you are little bastard_

In this case, it seems like the anomaly has happened in a very particular moment of the day like someone was doing a lot of requests to the web in a small fraction of the time.

### Filter by City or Country

Now looking at the table of metrics filtered by City there is a particular one with a lot of requests.

![City Filtered Analytics Table](/old-posts-images/2017/08/City_Filtered_Analytics_Table.PNG)\
_Zaporozhye, Ukraine_

That could be a great follower of my blog but I will be a little reluctant and investigate a little more.

### Filter by Network

Just to ensure that these Ukrainian visits are reliable I'm going to look at the Network section on the left panel under Audience and then Technology.

![Service Provider Filtered Analytics Table](/old-posts-images/2017/08/Service_Provider_Filtered_Analytics_Table.PNG)

Looking at the table it seems that my Ukrainian visits are being provided by `ovh hosting inc.` which is strange because that is my actual hosting provider. And looking at the bounce rate for those visits that is 100% it will mess the metrics changing the real user bounce rate.

To ensure that this is my machine I check the Hostname dimension (the link is on top of the table).

![Hostname Filtered Analytics Table](/old-posts-images/2017/08/Hostname_Filtered_Analytics_Table.PNG)

There only appears my hostname. Sometimes these anomalies are caused by spam bots or crawlers and you could identify them in this view. This time seems that the problem is coming from my hosting provider.

## Filtering Analytics to get Clean Metrics

So now that I've recap a lot of info about what is going on with the metrics I can create some filters to ensure that my metrics are clean next time I check them.

First thing is to create a "Master" view that is going to have all the filters avoiding spam traffic and annoying stuff and I would leave the original view renamed to "Unfiltered" to compare its traffic time to time with "Master".

The way to create views is in the Admin section with the property selected by clicking on the `VIEW` select box and then on "Create New View". Once it is created the filters could be applied by clicking on the Filters section.

![Analytics Admin Panel](/old-posts-images/2017/08/Analytics_Admin_Panel.PNG)

### Create Filters in Google Analytics

Google Analytics offers tons of ways to filter our metrics, not only to clean them but also to have a custom type of views that could be used for different purposes.

The first filter I'm going to need is to exclude all the traffic that could come from unknown hostnames.

![Filtering Including Hostname](/old-posts-images/2017/08/Creating_Google_Analytics_Filter.PNG)

Then a filter for my annoying Hosting provider.

![Filtering Excluding Hostname](/old-posts-images/2017/08/Creating_Google_Analytics_Filter_For_ISP.PNG)

And finally to ensure that Crawlers doesn't pollute my metrics, one for them.

![Filtering Excluding Crawlers](/old-posts-images/2017/08/Creating_Google_Analytics_Filter_For_Crawlers.PNG)

Here you have the expression I used for the crawlers:

```
site-auditor\.online|speedup-my\.site|website-analytics\.online
```

You can detect them under the Acquisition section on Referrals.

_**Note:** Filters doesn't clean info of your metrics from the past, so they will start working from the moment you apply them._

## Keep it clean!

That's all, now on it's up to you to improve it. You can read more on [Google Analytics Filter Documentation](https://support.google.com/analytics/topic/1032939)

<!--kg-card-end: markdown-->
