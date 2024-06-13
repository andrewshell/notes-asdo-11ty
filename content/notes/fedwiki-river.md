---
title: FedWiki River
created: 2024-06-12T14:23:53.000Z
---
[FedWiki River](https://fedwikiriver.com/) is an [river-of-news aggregator](http://scripting.com/2014/06/02/whatIsARiverOfNewsAggregator.html) of updates across all known [federated wikis](http://fed.wiki.org/view/welcome-visitors/view/about-federated-wiki).

It's powered by [Federated Wiki Feeds](https://feeds.fedwikiriver.com/) which crawls the wikis and exposes [RSS feeds](https://cyber.harvard.edu/rss/rss.html) and [OPML](https://opml.org/spec2.opml) [reading lists](http://scripting.com/2023/10/21/143159.html).

## Crawl Logic

The wiki checking logic is that every wiki in the [all feeds list](https://feeds.fedwikiriver.com/river.opml) get checked once an hour and any wikis flagged as [active](https://feeds.fedwikiriver.com/activefeeds.opml) (updated in the last week) are checked once a minute.

When a wiki sitemap is pulled, if I find that it's updated I update my cached copy and ping the [rssCloud server](/notes/rsscloud-server/) of an update.

Once a day I fetch a list of known wikis from [search.fed.wiki.org](http://search.fed.wiki.org:3030/logs/online) and add any missing wikis to my master list.

### Peer Domains

If I don't have any items in my list of "peer domains" I refresh the list. A peer domain is a wiki domain that only has a different subdomain. So `andrew.dojo.fed.wiki` is a peer of `ward.dojo.fed.wiki`. My list of peer domains is created by filtering the list of all domains, removing any domains that already have a peer in the peer domain list.

Every minute I pull one peer domain off the list and fetch it's list of peers. This list is provided by the [present plugin](http://ward.dojo.fed.wiki/view/about-present-plugin). If it doesn't have the "present" plugin enabled, it returns one item. Here is an example of a [list of peers](http://andrew.dojo.fed.wiki/plugin/present/roll).

Any wiki in the list of peers that I haven't seen before gets added to the all feeds list as active, although if it isn't active it will get flagged as inactive after the first pull of its sitemap.

### Checking Feeds

If I don't have any items in my list of inactive feeds, I refresh the list which is all inactive feeds grouped in 60 chunks (one chunk a minute.)

I then create a list of feeds to check which are all active feeds and one chunk from the inactive feed list.

This way, any wiki that is updated regularly should have updates show up in the river within a minute (or so) while stale wikis that don't get updated regularly don't gum up the system.

### Rosters

[Rosters](http://ward.dojo.fed.wiki/view/about-roster-plugin) needed special logic. Most rosters in the fediverse won't need to be fetched on a regular basis because nobody is viewing their river.

However, fetching a roster the first time can be slow. Especially if it links out to other rosters or lists of references.

So if a roster list or river is fetched, it will be added to a list of active rosters. These rosters will be checked at a rate of one roster a minute in a loop. If the list or river hasn't been fetched in over two weeks it's dropped from the list of active rosters and won't be kept fresh in the cache.
