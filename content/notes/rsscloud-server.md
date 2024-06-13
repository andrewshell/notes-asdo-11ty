---
title: RssCloud Server
created: 2024-06-12T14:23:53.000Z
---
RssCloud is a technology designed to provide real-time updates for RSS feeds, streamlining the process of feed notification and reducing the need for frequent polling by feed readers.

The original rssCloud server was written by [Dave Winer](https://davewiner.com/) in [Frontier](https://en.wikipedia.org/wiki/UserLand_Software#Frontier)/[OPML Editor](https://home.opml.org/).

In March 2015, I built [a Node.js port](https://github.com/rsscloud/rsscloud-server) of the server. Since then, I've continued to maintain and [host](https://rpc.rsscloud.io/) the project.

## Functionality of rssCloud

The cloud element, documented in the [RSS 2.0 specification](https://cyber.harvard.edu/rss/rss.html#ltcloudgtSubelementOfLtchannelgt) by Dave Winer, allows an RSS feed to specify a server for real-time update notifications. This server, known as an rssCloud server, facilitates immediate notifications to aggregators when a feed changes, eliminating the need for constant polling.

### How rssCloud Works

1. **Feed Declaration:** An RSS feed includes a cloud element specifying the rssCloud server for change notifications.
2. **Aggregator Request:** Feed aggregators send a request to the rssCloud server, asking to be notified when the feed changes.
3. **Notification Process:** When the feed updates, the rssCloud server notifies all subscribed aggregators, prompting them to check the feed again for new content.

This mechanism is particularly useful for feeds that update frequently, such as the [Hacker News Firehose](http://hn.geekity.com/), reducing the need for constant polling and enabling near real-time updates.

## Comparison with WebSub

[WebSub](https://en.wikipedia.org/wiki/WebSub) (formerly PubSubHubbub) is a similar technology that enhances RSS feed updates. The key difference lies in the notification method:

- **WebSub:** The server parses the feed and sends a "fat ping," including updated items directly to subscribers.
- **rssCloud:** The server only sends a URL notification, without parsing content, making it simpler to implement and less resource-intensive.

While WebSub's approach is preferred by some for reducing load on the feed source, rssCloud's simplicity offers flexibility and broader potential applications, such as notifying subscribers of any URL changes, not just RSS/Atom feeds.

## Implementation and Tools

- **FeedLand:** A news aggregator developed by Dave Winer, which has rssCloud support.
- **rssCloud Server:** A lightweight server that handles URL notifications, simplifying real-time update mechanisms for feed aggregators.

For comprehensive information on rssCloud, refer to [Dave Winer's documentation](http://rsscloud.co/).

By leveraging rssCloud, developers and content providers can enhance the efficiency of their feed update systems, ensuring timely content delivery with minimal resource overhead.
