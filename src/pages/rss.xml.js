import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";
import createSlug from "../lib/createSlug";

function getRssItem(post) {
    const slug = createSlug(post.data.title, post.id);
    const item = {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${slug}/`,
    };

    return item;
}

export async function GET(context) {
    const blog = await getCollection("blog");
    const items = blog.map(getRssItem);
    const feed = await rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: import.meta.env.SITE,
        items: items,
    });

    return feed;
}
