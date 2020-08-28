import React from 'react'
import {Helmet} from "react-helmet";
import Head from 'next/head'

import {getImageUrl} from '../../utils'

const MetaTags = props => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <description style={{
                display: 'none'
            }}>{props.description}</description>
            <link rel="canonical" href={props.url} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.url}></meta>
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image} />
            <meta property="twitter:card" content={props.url}></meta>
        </Helmet>
        <Head>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <description style={{
                display: 'none'
            }}>{props.description}</description>
            <link rel="canonical" href={props.url} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.url}></meta>
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image} />
            <meta property="twitter:card" content={props.url}></meta>
        </Head>
    </>)
}

export const PostMetaTags = ({post, tag}) => (<MetaTags 
    title={`
        fellara | Post ${post.user_info ? 'by ' + post.user_info.name + ' from ' + post.user_info.location : ''}
        ${' | '}
        ${tag ? 'In ' + tag.title : ''}
    `}
    description={`
      ${'fellara is platform for sharing your culture and traditions. People from all around the world share their daily life via fellara.'}
    `}
    image={getImageUrl(post.clean_image_medium?.url)}
    url={`http://app.fellara.com/page?id=${post?.id}&tag=${tag?.id}`}
/>)

export default MetaTags