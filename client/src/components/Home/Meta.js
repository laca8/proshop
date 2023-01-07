import React from 'react'
import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}
Meta.defaultProps = {
    tutle:'Welcome To Proshop',
    description:'we sell the best products for cheap',
    keywords:'electronic, buy electronics , cheap electronics'
}
export default Meta
