import React from 'react';
import {Image, List, useLDflex, Value} from '@solid/react';
import Email from "./Email";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function BlogPosts({author}) {
    console.log(author);
    let [posts, pending, error] = useLDflex(`[${author}][schema:blogPost]`, true);
    let [labels] = useLDflex(`[${author}][schema:blogPost].label`, true);
    let [keywords] = useLDflex(`[${author}][schema:blogPost][schema:keywords]`, true);
    let [thumbnails] = useLDflex(`[${author}][schema:blogPost][schema:thumbnailUrl]`, true);
    let [published] = useLDflex(`[${author}][schema:blogPost][schema:datePublished]`, true);
    let [texts] = useLDflex(`[${author}][schema:blogPost][schema:text]`, true);

    if (pending)
        return <span>loading <em>({posts.length} posts so far)</em></span>;
    if (error)
        return <span>loading failed: {error.message}</span>;
    posts = posts.map((post) => {
        return post.value;
    });
    labels = labels.map((label) => {
        return label.value;
    });
    keywords = keywords.map((keyword) => {
        return keyword.value.split(" ");
    });
    thumbnails = thumbnails.map((thumbnail) => {
        return thumbnail.value;
    });
    published = published.map((date) => {
        return date.value;
    });
    texts = texts.map((text) => {
        return text.value;
    });
    let data = posts.map(function (x, i) {
        return {name: labels[i], url: x, keywords: keywords[i], thumbnail: thumbnails[i], date: published[i], text: texts[i]}
    });
    console.log(data);
    console.log(labels);
    console.log(keywords);
    return data.map((post) => (<Card>
        <Card.Img variant="top" src={post.thumbnail} />
        <Card.Body>
            <Card.Title>{post.name}</Card.Title>
            <Card.Subtitle>{post.date}</Card.Subtitle>
            <Card.Text>
                {post.text}
            </Card.Text>
            <Card.Link href={post.url} target="_blank">Open post</Card.Link>
        </Card.Body>
    </Card>));

}



