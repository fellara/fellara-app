import React from 'react'
import {Helmet} from "react-helmet";
import Head from 'next/head'

import {getImageUrl} from '../../utils'

const description = 'fellara is a platform for sharing your culture and traditions through photos. People from all around the world share their daily life via fellara.'

const MetaTags = props => {
    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <link rel="canonical" href={props.url} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.url}></meta>
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image} />
            <meta property="twitter:card" content='summary_large_image'></meta>
        </Helmet>
        <Head>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <link rel="canonical" href={props.url} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.url}></meta>
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image} />
            <meta property="twitter:card" content='summary_large_image'></meta>
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
      ${description}
    `}
    image={getImageUrl(post.clean_image_medium?.url)}
    url={`https://app.fellara.com/p/${post?.id}?tag=${tag?.id}`}
/>)

export const ProfileMetaTags = ({profile}) => {
    return (<MetaTags 
        title={`
            fellara | Posts by ${profile.first_name + ' ' + profile.last_name} from ${profile.location}
        `}
        description={`
            ${description}
        `}
        image={getImageUrl(profile.profile_image_small)}
        url={`https://app.fellara.com/u/${profile?.id}`}
    />)
}

export default MetaTags