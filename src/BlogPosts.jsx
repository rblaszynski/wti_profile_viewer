import React from 'react';
import {Image, List, useLDflex, Value} from '@solid/react';
import Email from "./Email";

export default function BlogPosts({ author }) {
    console.log(author);
    let [posts, pending, error] = useLDflex(`[${author}][schema:blogPost]`, true);
    let [labels] = useLDflex(`[${author}][schema:blogPost].label`, true);
    let [makers] = useLDflex(`[${author}][schema:blogPost].maker`, true);
    if (pending)
        return <span>loading <em>({posts.length} posts so far)</em></span>;
    if (error)
        return <span>loading failed: {error.message}</span>;
    posts = posts.map((post, index) => {
        return post.value;
    });
    labels = labels.map((label, index) => {
        return label.value;
    });
    makers = makers.map((maker) => {
        return maker.value;
    });
    let data = posts.map(function(x, i) {
        return {name: labels[i], url: x}
    });
    console.log(data);
    console.log(labels);
    console.log(makers);
    return <ul>{data.map((post, index) =>
        <li key={index}>
            <div>
                <Value src={data[index].name}/>
                <br/>
                <a href={data[index].url} target="_blank">{data[index].url}</a>
            </div>
        </li>)}
    </ul>;
}
