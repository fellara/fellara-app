import React from 'react'
import {Helmet} from "react-helmet";

const MetaTags = props => {

    return (<Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <description>{props.description}</description>
        <link rel="canonical" href={props.url} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />
        <meta property="og:url" content={props.url}></meta>
        <meta property="twitter:title" content={props.title} />
        <meta property="twitter:description" content={props.description} />
        <meta property="twitter:image" content={props.image} />
        <meta property="twitter:card" content={props.url}></meta>
    </Helmet>)
}

export default MetaTags