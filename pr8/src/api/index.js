import axios from "axios";
import { stripHtml } from "string-strip-html";
const formatDevPost = (post) => {
  return {
    title: post.title.trim(),
    description: textEllipsis(
      stripHtml(post.content, {
        stripTogetherWithTheirContents: ["script", "style", "xml", "figure"],
      })
        .result.replace("\n", "")
        .trim()
    ),
    thumbnail:
      post.thumbnail ||
      extractThumbnailFromMedium(
        stripHtml(post.content, {
          ignoreTagsWithTheirContents: ["figure"],
          stripTogetherWithTheirContents: ["script", "style", "xml", "p"],
        })
          .result.replace("\n", "")
          .trim()
      ) ||
      `https://source.unsplash.com/random/500x500/?${post.title}`,
    link: post.guid,
    categories: post.categories,
    publishedAt: new Date(post.pubDate),
  };
};
const textEllipsis = (str, length = 100, ending = "...") => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const extractThumbnailFromMedium = (html) => {
  const figureRegex =
    /<figure[^>]*>(.*?)<img[^>]*src="([^"]*)"[^>]*>.*?<\/figure>/i;

  const match = figureRegex.exec(html);

  if (match && match.length >= 3) {
    return match[2];
  } else {
    return "";
  }
};
export const getDevPost = async ({ user }) => {
  try {
    if (!user) return [];

    let response = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${user}`
    );

    return response.data.items.map((item) => formatDevPost(item));
  } catch (error) {
    return [];
  }
};

export const dd = (arr) =>
  arr.reduce(
    (acc, _, i) =>
      i % Math.ceil(arr.length / 4) === 0
        ? [...acc, arr.slice(i, i + Math.ceil(arr.length / 4))]
        : acc,
    []
  );
